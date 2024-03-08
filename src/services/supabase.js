import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hyaqdqmcgpqzwadsztue.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YXFkcW1jZ3BxendhZHN6dHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3Mzc5NTcsImV4cCI6MjAyNTMxMzk1N30.-l4af1cv05oXgviJeBhc1TsOX7bq5L2hnmFgYHasH60";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
