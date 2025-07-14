
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
// Use the service_role key for server-side operations to bypass RLS policies.
// For simplicity in this example, we use the anon key. In production, consider using the service_role key.
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Supabase URL and Key must be provided in .env file');
  console.error('Supabase URL:', supabaseUrl ? 'Loaded' : 'Missing');
  console.error('Supabase Key:', supabaseKey ? 'Loaded' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
