export const env = {
  // Database
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://localhost:5432/altwent",
  DIRECT_URL:
    process.env.DIRECT_URL ||
    "postgresql://localhost:5432/altwent",

  // Supabase
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || "",

  // From Blob Storage Integration (optional)
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || "",


};

// Warn if optional env vars are missing in production
if (process.env.NODE_ENV === "production") {
  const optionalVars = [
    "BLOB_READ_WRITE_TOKEN",
  ];

  for (const key of optionalVars) {
    if (!process.env[key]) {
      console.warn(`⚠️ Optional environment variable missing: ${key}`);
    }
  }
}
