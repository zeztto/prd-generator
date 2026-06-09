import { NextRequest, NextResponse } from "next/server";

import { completeUserOnboarding, requireCurrentUser } from "@/lib/server/auth";

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireCurrentUser(request);
    const body = await request.json();

    if (!body.termsAgreed || !body.privacyAgreed) {
      return NextResponse.json(
        { error: "필수 약관에 동의해주세요." },
        { status: 400 },
      );
    }

    const updatedUser = await completeUserOnboarding(user.id, body);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "온보딩 처리 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 401 });
  }
}
