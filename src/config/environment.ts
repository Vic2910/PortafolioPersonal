export const config = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}
