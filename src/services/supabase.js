import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://vdofhhscriejiekcxojj.supabase.co';
const supabaseKey = 'sb_publishable_t4JpGL0bEYT00VIuKOTj6Q_fL4q1hAs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
