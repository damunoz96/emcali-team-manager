import { createClient } from "@supabase/supabase-js";
import { environment } from "../../../environments/environment";
import { Database } from "../models/database.types";

const supabaseUrl = environment.supabase_Url;
const supabaseAnonKey = environment.supabase_Anon_Key;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
