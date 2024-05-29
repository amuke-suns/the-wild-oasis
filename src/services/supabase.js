import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qjbyyxtezhlfofjmysng.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqYnl5eHRlemhsZm9mam15c25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2OTA3NzUsImV4cCI6MjAzMTI2Njc3NX0.rquvJfhr2sLM5mfzgqJDHugSSg5FUmgPzLjznsLRFb8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
