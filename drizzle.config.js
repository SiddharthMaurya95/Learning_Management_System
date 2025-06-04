import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  schema: './configs/schema.js',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_JwVO8oWglkS7@ep-little-violet-a1n28j6t-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
});