export const env = {
  // Database
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://localhost:5432/altwent",
  DIRECT_URL:
    process.env.DIRECT_URL ||
    "postgresql://localhost:5432/altwent",

  // From Blob Storage Integration
  BLOB_READ_WRITE_TOKEN:
    process.env.BLOB_READ_WRITE_TOKEN || "",

  // From Upstash Search Integration
  UPSTASH_SEARCH_REST_READONLY_TOKEN:
    process.env.UPSTASH_SEARCH_REST_READONLY_TOKEN || "",
  UPSTASH_SEARCH_REST_TOKEN:
    process.env.UPSTASH_SEARCH_REST_TOKEN || "",
  UPSTASH_SEARCH_REST_URL:
    process.env.UPSTASH_SEARCH_REST_URL || "",
};

// Warn if required env vars are missing
const requiredVars = [
  "BLOB_READ_WRITE_TOKEN",
  "UPSTASH_SEARCH_REST_TOKEN",
  "UPSTASH_SEARCH_REST_URL",
];

for (const key of requiredVars) {
  if (!process.env[key]) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
  }
}
