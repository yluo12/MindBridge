import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the URL and API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
console.log('supabaseUrl', supabaseUrl);
console.log('supabaseKey', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
//  throw new Error('Supabase url and supabase key are required.');
  console.log('supabase url or key is not here');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;