import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the URL and API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
console.log('supabaseUrl', supabaseUrl);
console.log('supabaseKey', supabaseKey);

const url = 'https://kbrdjoieqdsgnjseyxca.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticmRqb2llcWRzZ25qc2V5eGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzg4NzUsImV4cCI6MjA1NzkxNDg3NX0.plmU2XEEANCWP6_b81hOPbjWkf2eX0FZ0LtpTuIjNkw';

if (!supabaseUrl || !supabaseKey) {
//  throw new Error('Supabase url and supabase key are required.');
  console.log('supabase url or key is not here');
}

const supabase = createClient(url, key);

export default supabase;