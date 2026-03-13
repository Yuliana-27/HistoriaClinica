import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://woxijedmcgsmkxpgiswb.supabase.co'       // ← pega tu URL
const SUPABASE_KEY = 'sb_publishable_JHd3sltnhrEpX62pubaQoQ_pzUlVGAZ'                       // ← pega tu key

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)