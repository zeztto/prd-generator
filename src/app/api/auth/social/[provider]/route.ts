import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      error:
        "소셜 로그인은 현재 Railway/Turso 백엔드 범위에서 제외되었습니다. 우선 이메일 로그인을 사용해주세요.",
    },
    { status: 501 },
  );
}
