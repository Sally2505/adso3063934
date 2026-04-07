import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx ./prisma/seed.ts",
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL for migrations (recommended for Neon), fallback to DATABASE_URL.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
