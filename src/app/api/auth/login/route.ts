import { NextRequest, NextResponse } from "next/server";

import {
  authenticateCredentialUser,
  createSession,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "@/lib/server/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    const user = await authenticateCredentialUser(email, password);
    const session = await createSession(user.id);
    const response = NextResponse.json({ user });

    response.cookies.set(
      SESSION_COOKIE_NAME,
      session.token,
      getSessionCookieOptions(session.expiresAt),
    );

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "로그인 처리 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
