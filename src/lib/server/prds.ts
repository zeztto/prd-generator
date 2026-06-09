import { randomUUID } from "crypto";

import { db } from "@/lib/server/db";
import { createEmptyPRDInput, createEmptyPRDSections } from "@/lib/prd/defaults";
import type { PRDDocument, PRDSummary } from "@/types/prd.types";
import { DocStatus } from "@/types/prd.types";

type DbRow = Record<string, unknown>;

interface PRDContentPayload {
  projectSetup: PRDDocument["projectSetup"];
  background: PRDDocument["background"];
  goals: PRDDocument["goals"];
  targetUsers: PRDDocument["targetUsers"];
  features: PRDDocument["features"];
  solution: PRDDocument["solution"];
  scope: PRDDocument["scope"];
  reviewResult?: PRDDocument["reviewResult"];
}

function nowIso() {
  return new Date().toISOString();
}

function parseContentJson(value: unknown): PRDContentPayload {
  if (typeof value !== "string") {
    return createEmptyPRDSections();
  }

  try {
    const parsed = JSON.parse(value) as Partial<PRDContentPayload>;
    return {
      ...createEmptyPRDSections(),
      ...parsed,
    };
  } catch {
    return createEmptyPRDSections();
  }
}

function normalizeQualityScore(
  qualityScore: number,
  reviewResult?: PRDDocument["reviewResult"],
) {
  if (reviewResult?.qualityScore?.overall != null) {
    return reviewResult.qualityScore.overall;
  }

  return qualityScore;
}

function mapPRDSummary(row: DbRow): PRDSummary {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description ?? ""),
    status: String(row.status) as DocStatus,
    qualityScore: Number(row.quality_score ?? 0),
    projectType:
      row.project_type == null ? null : String(row.project_type) as PRDSummary["projectType"],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapPRDDocument(row: DbRow): PRDDocument {
  const content = parseContentJson(row.content_json);
  const qualityScore = Number(row.quality_score ?? 0);

  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description ?? ""),
    status: String(row.status) as DocStatus,
    qualityScore: normalizeQualityScore(qualityScore, content.reviewResult),
    authorId: String(row.author_user_id),
    projectSetup: content.projectSetup,
    background: content.background,
    goals: content.goals,
    targetUsers: content.targetUsers,
    features: content.features,
    solution: content.solution,
    scope: content.scope,
    reviewResult: content.reviewResult,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

async function getWorkspaceIdForUser(userId: string) {
  const result = await db.execute({
    sql: `
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = ?
      ORDER BY created_at ASC
      LIMIT 1
    `,
    args: [userId],
  });

  const row = (result.rows[0] as DbRow | undefined) ?? null;
  return row ? String(row.workspace_id) : null;
}

function buildPersistedPayload(
  authorUserId: string,
  workspaceId: string,
  input: Partial<PRDDocument>,
  existing?: PRDDocument,
) {
  const base = existing ?? createEmptyPRDInput();

  const projectSetup = input.projectSetup
    ? { ...base.projectSetup, ...input.projectSetup }
    : base.projectSetup;
  const background = input.background
    ? { ...base.background, ...input.background }
    : base.background;
  const goals = input.goals ? { ...base.goals, ...input.goals } : base.goals;
  const targetUsers = input.targetUsers
    ? { ...base.targetUsers, ...input.targetUsers }
    : base.targetUsers;
  const features = input.features
    ? { ...base.features, ...input.features }
    : base.features;
  const solution = input.solution
    ? { ...base.solution, ...input.solution }
    : base.solution;
  const scope = input.scope ? { ...base.scope, ...input.scope } : base.scope;
  const reviewResult = input.reviewResult ?? base.reviewResult;
  const qualityScore = normalizeQualityScore(
    Number(input.qualityScore ?? base.qualityScore ?? 0),
    reviewResult,
  );

  return {
    authorUserId,
    workspaceId,
    title: input.title ?? base.title ?? projectSetup.title ?? "새 PRD",
    description:
      input.description ?? base.description ?? projectSetup.description ?? "",
    status: input.status ?? base.status ?? DocStatus.DRAFT,
    qualityScore,
    projectType: projectSetup.projectType ?? null,
    contentJson: JSON.stringify({
      projectSetup: {
        ...projectSetup,
        title: input.title ?? projectSetup.title,
        description: input.description ?? projectSetup.description,
      },
      background,
      goals,
      targetUsers,
      features,
      solution,
      scope,
      reviewResult,
    }),
  };
}

export async function listPRDsForUser(userId: string) {
  const result = await db.execute({
    sql: `
      SELECT
        p.id,
        p.title,
        p.description,
        p.status,
        p.quality_score,
        p.project_type,
        p.created_at,
        p.updated_at
      FROM prds p
      INNER JOIN workspace_members wm ON wm.workspace_id = p.workspace_id
      WHERE wm.user_id = ?
      ORDER BY p.updated_at DESC
    `,
    args: [userId],
  });

  return result.rows.map((row) => mapPRDSummary(row as DbRow));
}

export async function getPRDForUser(userId: string, prdId: string) {
  const result = await db.execute({
    sql: `
      SELECT p.*
      FROM prds p
      INNER JOIN workspace_members wm ON wm.workspace_id = p.workspace_id
      WHERE p.id = ? AND wm.user_id = ?
      LIMIT 1
    `,
    args: [prdId, userId],
  });

  const row = (result.rows[0] as DbRow | undefined) ?? null;
  return row ? mapPRDDocument(row) : null;
}

export async function createPRDForUser(userId: string, input: Partial<PRDDocument>) {
  const workspaceId = await getWorkspaceIdForUser(userId);
  if (!workspaceId) {
    throw new Error("워크스페이스를 찾을 수 없습니다.");
  }

  const payload = buildPersistedPayload(userId, workspaceId, input);
  const id = randomUUID();
  const timestamp = nowIso();

  await db.execute({
    sql: `
      INSERT INTO prds (
        id,
        workspace_id,
        author_user_id,
        title,
        description,
        status,
        quality_score,
        project_type,
        content_json,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      id,
      workspaceId,
      userId,
      payload.title,
      payload.description,
      payload.status,
      payload.qualityScore,
      payload.projectType,
      payload.contentJson,
      timestamp,
      timestamp,
    ],
  });

  const created = await getPRDForUser(userId, id);
  if (!created) {
    throw new Error("PRD 생성에 실패했습니다.");
  }

  return created;
}

export async function updatePRDForUser(
  userId: string,
  prdId: string,
  input: Partial<PRDDocument>,
) {
  const existing = await getPRDForUser(userId, prdId);
  if (!existing) {
    throw new Error("PRD를 찾을 수 없습니다.");
  }

  const payload = buildPersistedPayload(
    existing.authorId,
    (await getWorkspaceIdForUser(userId)) || existing.authorId,
    input,
    existing,
  );
  const timestamp = nowIso();

  await db.execute({
    sql: `
      UPDATE prds
      SET
        title = ?,
        description = ?,
        status = ?,
        quality_score = ?,
        project_type = ?,
        content_json = ?,
        updated_at = ?
      WHERE id = ?
    `,
    args: [
      payload.title,
      payload.description,
      payload.status,
      payload.qualityScore,
      payload.projectType,
      payload.contentJson,
      timestamp,
      prdId,
    ],
  });

  const updated = await getPRDForUser(userId, prdId);
  if (!updated) {
    throw new Error("PRD 업데이트에 실패했습니다.");
  }

  return updated;
}

export async function deletePRDForUser(userId: string, prdId: string) {
  const existing = await getPRDForUser(userId, prdId);
  if (!existing) {
    throw new Error("PRD를 찾을 수 없습니다.");
  }

  await db.execute({
    sql: "DELETE FROM prds WHERE id = ?",
    args: [prdId],
  });
}

export async function duplicatePRDForUser(userId: string, prdId: string) {
  const existing = await getPRDForUser(userId, prdId);
  if (!existing) {
    throw new Error("PRD를 찾을 수 없습니다.");
  }

  return createPRDForUser(userId, {
    ...existing,
    title: `${existing.title} (복사본)`,
    status: DocStatus.DRAFT,
  });
}

export async function updatePRDStatusForUser(
  userId: string,
  prdId: string,
  status: DocStatus,
) {
  return updatePRDForUser(userId, prdId, { status });
}
