import { NextRequest, NextResponse } from "next/server";

import { createPRDForUser, listPRDsForUser } from "@/lib/server/prds";
import { requireCurrentUser } from "@/lib/server/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await requireCurrentUser(request);
    const prds = await listPRDsForUser(user.id);

    return NextResponse.json({ prds });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PRD 목록을 불러올 수 없습니다.";

    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireCurrentUser(request);
    const body = await request.json();
    const prd = await createPRDForUser(user.id, body);

    return NextResponse.json({ prd }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PRD 생성 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
