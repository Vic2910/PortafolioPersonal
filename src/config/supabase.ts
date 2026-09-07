import { createClient } from '@supabase/supabase-js'
import { config } from './environment'

export const supabase = createClient(config.supabaseUrl, config.supabaseKey)
