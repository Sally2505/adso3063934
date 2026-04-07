import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing DIRECT_URL or DATABASE_URL in environment variables.");
  }

  const sql = neon(connectionString);

  const [counts] = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM "console") AS consoles,
      (SELECT COUNT(*)::int FROM "Games") AS games;
  `;

  console.log("Neon check:");
  console.log(`- Consoles: ${counts.consoles}`);
  console.log(`- Games: ${counts.games}`);
}

main().catch((error) => {
  console.error("DB check failed:", error);
  process.exit(1);
});
