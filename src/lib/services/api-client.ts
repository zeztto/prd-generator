export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function apiClient<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
) {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    credentials: "same-origin",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new APIError(
      payload?.error || "요청 처리 중 오류가 발생했습니다.",
      response.status,
    );
  }

  return payload as T;
}
