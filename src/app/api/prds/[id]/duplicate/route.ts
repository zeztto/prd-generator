import { NextRequest, NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/server/auth";
import { duplicatePRDForUser } from "@/lib/server/prds";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCurrentUser(request);
    const { id } = await context.params;
    const prd = await duplicatePRDForUser(user.id, id);

    return NextResponse.json({ prd }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PRD 복제에 실패했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
