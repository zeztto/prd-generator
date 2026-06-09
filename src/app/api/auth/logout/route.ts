import { NextRequest, NextResponse } from "next/server";

import {
  deleteSession,
  getExpiredSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "@/lib/server/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await deleteSession(token);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    SESSION_COOKIE_NAME,
    "",
    getExpiredSessionCookieOptions(),
  );

  return response;
}
