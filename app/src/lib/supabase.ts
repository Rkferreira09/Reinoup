import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Client Supabase — opcional por design.
 *
 * O app roda 100% offline em localStorage. Quando VITE_SUPABASE_URL e
 * VITE_SUPABASE_ANON_KEY existirem (ver .env.example), o client é criado e
 * fica disponível para a camada de sync. Sem essas envs, `supabase` é `null`
 * e nada quebra — é assim que o protótipo continua funcionando enquanto o
 * backend ainda não está com as chaves em mãos.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured ? createClient(url, anonKey) : null;
