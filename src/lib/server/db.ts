import { createClient, type Client } from "@libsql/client";

declare global {
  var __prdDbClient: Client | undefined;
}

function getDatabaseUrl() {
  return process.env.TURSO_DATABASE_URL || "file:local.db";
}

function createDatabaseClient() {
  const url = getDatabaseUrl();
  const authToken =
    url.startsWith("file:") || url.startsWith(":memory:")
      ? undefined
      : process.env.TURSO_AUTH_TOKEN;

  return createClient({
    url,
    authToken,
  });
}

export const db = global.__prdDbClient ?? createDatabaseClient();

if (process.env.NODE_ENV !== "production") {
  global.__prdDbClient = db;
}
