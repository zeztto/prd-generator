export interface Migration {
  name: string;
  statements: string[];
}

export const MIGRATIONS: Migration[] = [
  {
    name: "001_init",
    statements: [
      "PRAGMA foreign_keys = ON",
      `
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'USER',
          status TEXT NOT NULL DEFAULT 'ACTIVE',
          profile_image TEXT,
          job_title TEXT,
          experience TEXT,
          is_onboarded INTEGER NOT NULL DEFAULT 0,
          terms_agreed INTEGER NOT NULL DEFAULT 0,
          privacy_agreed INTEGER NOT NULL DEFAULT 0,
          marketing_agreed INTEGER NOT NULL DEFAULT 0,
          consented_at TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `,
      `
        CREATE TABLE IF NOT EXISTS auth_accounts (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          provider TEXT NOT NULL,
          provider_account_id TEXT NOT NULL,
          password_hash TEXT,
          created_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE(provider, provider_account_id)
        )
      `,
      `
        CREATE TABLE IF NOT EXISTS workspaces (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT NOT NULL DEFAULT 'personal',
          owner_user_id TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `,
      `
        CREATE TABLE IF NOT EXISTS workspace_members (
          workspace_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'OWNER',
          created_at TEXT NOT NULL,
          PRIMARY KEY (workspace_id, user_id),
          FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `,
      `
        CREATE TABLE IF NOT EXISTS sessions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          token_hash TEXT NOT NULL UNIQUE,
          expires_at TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `,
      `
        CREATE TABLE IF NOT EXISTS prds (
          id TEXT PRIMARY KEY,
          workspace_id TEXT NOT NULL,
          author_user_id TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'DRAFT',
          quality_score INTEGER NOT NULL DEFAULT 0,
          project_type TEXT,
          content_json TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
          FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `,
      "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)",
      "CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash)",
      "CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)",
      "CREATE INDEX IF NOT EXISTS idx_prds_workspace_id ON prds(workspace_id)",
      "CREATE INDEX IF NOT EXISTS idx_prds_author_user_id ON prds(author_user_id)",
      "CREATE INDEX IF NOT EXISTS idx_prds_updated_at ON prds(updated_at DESC)",
    ],
  },
];
