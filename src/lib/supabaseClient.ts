import { createClient } from '@supabase/supabase-js';

declare global {
    interface Window {
        supabase: ReturnType<typeof createClient>;
    }
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

window.supabase = createClient(supabaseUrl, supabaseAnonKey); 