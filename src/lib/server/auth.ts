import { randomBytes, randomUUID, createHash } from "crypto";
import { compare, hash } from "bcryptjs";
import type { NextRequest } from "next/server";

import { db } from "@/lib/server/db";
import type { OnboardingData, SignupData, User } from "@/types/auth.types";
import { UserRole, UserStatus } from "@/types/auth.types";

export const SESSION_COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME || "prd_session";
export const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS || "30");

const SESSION_TTL_MS = SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

type DbRow = Record<string, unknown>;

function isTruthyNumber(value: unknown) {
  return Number(value) === 1;
}

function mapUser(row: DbRow): User {
  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    role: String(row.role) as UserRole,
    status: String(row.status) as UserStatus,
    profileImage:
      row.profile_image == null ? undefined : String(row.profile_image),
    jobTitle: row.job_title == null ? undefined : String(row.job_title),
    experience: row.experience == null ? undefined : String(row.experience),
    isOnboarded: isTruthyNumber(row.is_onboarded),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function getPersonalWorkspaceName(name: string) {
  return `${name}의 워크스페이스`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getSessionExpiryDate() {
  return new Date(Date.now() + SESSION_TTL_MS);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function getUserRowById(userId: string) {
  const result = await db.execute({
    sql: `
      SELECT
        id,
        email,
        name,
        role,
        status,
        profile_image,
        job_title,
        experience,
        is_onboarded,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    args: [userId],
  });

  return (result.rows[0] as DbRow | undefined) ?? null;
}

export async function createCredentialUser(data: SignupData) {
  const email = normalizeEmail(data.email);
  const existing = await db.execute({
    sql: "SELECT id FROM users WHERE email = ? LIMIT 1",
    args: [email],
  });

  if (existing.rows.length > 0) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  const now = new Date().toISOString();
  const userId = randomUUID();
  const accountId = randomUUID();
  const workspaceId = randomUUID();
  const passwordHash = await hash(data.password, 10);

  await db.batch(
    [
      {
        sql: `
          INSERT INTO users (
            id,
            email,
            name,
            role,
            status,
            is_onboarded,
            created_at,
            updated_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          userId,
          email,
          data.name.trim(),
          UserRole.USER,
          UserStatus.ACTIVE,
          0,
          now,
          now,
        ],
      },
      {
        sql: `
          INSERT INTO auth_accounts (
            id,
            user_id,
            provider,
            provider_account_id,
            password_hash,
            created_at
          )
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        args: [accountId, userId, "credentials", email, passwordHash, now],
      },
      {
        sql: `
          INSERT INTO workspaces (
            id,
            name,
            type,
            owner_user_id,
            created_at,
            updated_at
          )
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        args: [
          workspaceId,
          getPersonalWorkspaceName(data.name.trim()),
          "personal",
          userId,
          now,
          now,
        ],
      },
      {
        sql: `
          INSERT INTO workspace_members (
            workspace_id,
            user_id,
            role,
            created_at
          )
          VALUES (?, ?, ?, ?)
        `,
        args: [workspaceId, userId, "OWNER", now],
      },
    ],
    "write",
  );

  const userRow = await getUserRowById(userId);
  if (!userRow) {
    throw new Error("사용자 생성에 실패했습니다.");
  }

  return mapUser(userRow);
}

export async function authenticateCredentialUser(
  emailInput: string,
  password: string,
) {
  const email = normalizeEmail(emailInput);
  const result = await db.execute({
    sql: `
      SELECT
        u.id,
        u.email,
        u.name,
        u.role,
        u.status,
        u.profile_image,
        u.job_title,
        u.experience,
        u.is_onboarded,
        u.created_at,
        u.updated_at,
        a.password_hash
      FROM users u
      INNER JOIN auth_accounts a ON a.user_id = u.id
      WHERE u.email = ? AND a.provider = 'credentials'
      LIMIT 1
    `,
    args: [email],
  });

  const row = (result.rows[0] as DbRow | undefined) ?? null;

  if (!row || typeof row.password_hash !== "string") {
    throw new Error("등록되지 않은 이메일이거나 비밀번호가 올바르지 않습니다.");
  }

  const isValid = await compare(password, row.password_hash);

  if (!isValid) {
    throw new Error("등록되지 않은 이메일이거나 비밀번호가 올바르지 않습니다.");
  }

  return mapUser(row);
}

export async function createSession(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const now = new Date().toISOString();
  const expiresAt = getSessionExpiryDate().toISOString();

  await db.execute({
    sql: `
      INSERT INTO sessions (
        id,
        user_id,
        token_hash,
        expires_at,
        created_at
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [randomUUID(), userId, tokenHash, expiresAt, now],
  });

  return {
    token: rawToken,
    expiresAt,
  };
}

export async function deleteSession(token: string) {
  await db.execute({
    sql: "DELETE FROM sessions WHERE token_hash = ?",
    args: [hashToken(token)],
  });
}

export async function getUserFromSessionToken(token: string) {
  const result = await db.execute({
    sql: `
      SELECT
        u.id,
        u.email,
        u.name,
        u.role,
        u.status,
        u.profile_image,
        u.job_title,
        u.experience,
        u.is_onboarded,
        u.created_at,
        u.updated_at,
        s.id AS session_id,
        s.expires_at
      FROM sessions s
      INNER JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?
      LIMIT 1
    `,
    args: [hashToken(token)],
  });

  const row = (result.rows[0] as DbRow | undefined) ?? null;

  if (!row) {
    return null;
  }

  const expiresAt = new Date(String(row.expires_at));
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
    await db.execute({
      sql: "DELETE FROM sessions WHERE id = ?",
      args: [String(row.session_id)],
    });
    return null;
  }

  return mapUser(row);
}

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return getUserFromSessionToken(token);
}

export async function requireCurrentUser(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  return user;
}

export async function completeUserOnboarding(
  userId: string,
  data: OnboardingData,
) {
  const now = new Date().toISOString();

  await db.execute({
    sql: `
      UPDATE users
      SET
        terms_agreed = ?,
        privacy_agreed = ?,
        marketing_agreed = ?,
        consented_at = ?,
        job_title = ?,
        experience = ?,
        is_onboarded = 1,
        updated_at = ?
      WHERE id = ?
    `,
    args: [
      data.termsAgreed ? 1 : 0,
      data.privacyAgreed ? 1 : 0,
      data.marketingAgreed ? 1 : 0,
      now,
      data.jobTitle ?? null,
      data.experience ?? null,
      now,
      userId,
    ],
  });

  const userRow = await getUserRowById(userId);

  if (!userRow) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  return mapUser(userRow);
}

export function getSessionCookieOptions(expiresAt: string) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  };
}

export function getExpiredSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  };
}
