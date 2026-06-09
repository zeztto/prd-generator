import { NextRequest, NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/server/auth";
import { updatePRDStatusForUser } from "@/lib/server/prds";
import { DocStatus } from "@/types/prd.types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireCurrentUser(request);
    const { id } = await context.params;
    const { status } = await request.json();

    if (!Object.values(DocStatus).includes(status)) {
      return NextResponse.json(
        { error: "유효하지 않은 문서 상태입니다." },
        { status: 400 },
      );
    }

    const prd = await updatePRDStatusForUser(user.id, id, status);

    return NextResponse.json({ prd });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "상태 업데이트에 실패했습니다.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
