import { NextRequest, NextResponse } from "next/server";

import {
  createCredentialUser,
  createSession,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "@/lib/server/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: "이름, 이메일, 비밀번호를 모두 입력해주세요." },
        { status: 400 },
      );
    }

    const user = await createCredentialUser(body);
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
      error instanceof Error ? error.message : "회원가입 처리 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
