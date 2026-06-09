import { NextRequest, NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/server/auth";
import {
  deletePRDForUser,
  getPRDForUser,
  updatePRDForUser,
} from "@/lib/server/prds";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCurrentUser(request);
    const { id } = await context.params;
    const prd = await getPRDForUser(user.id, id);

    if (!prd) {
      return NextResponse.json(
        { error: "PRD를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json({ prd });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PRD를 불러올 수 없습니다.";

    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCurrentUser(request);
    const { id } = await context.params;
    const body = await request.json();
    const prd = await updatePRDForUser(user.id, id, body);

    return NextResponse.json({ prd });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PRD 업데이트에 실패했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCurrentUser(request);
    const { id } = await context.params;
    await deletePRDForUser(user.id, id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PRD 삭제에 실패했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
