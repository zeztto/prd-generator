import { db } from "../src/lib/server/db";
import { MIGRATIONS } from "../src/lib/server/migrations";

async function migrate() {
  for (const migration of MIGRATIONS) {
    console.log(`Applying migration: ${migration.name}`);
    await db.batch(
      migration.statements.map((sql) => ({ sql })),
      "write",
    );
  }

  console.log("Database migration completed.");
}

migrate().catch((error) => {
  console.error("Database migration failed.", error);
  process.exit(1);
});
