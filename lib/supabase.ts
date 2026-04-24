import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";

// Client for public read access
export const supabasePublic = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY
);

// For server-side operations (service role)
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY
);

// Storage bucket names
export const STORAGE_BUCKETS = {
  PHOTOS: "memories-photos",
  COVERS: "album-covers",
} as const;
