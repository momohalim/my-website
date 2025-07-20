import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project-id.supabase.co" &&
  supabaseAnonKey !== "your-anon-key-here";

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase is not properly configured. Using fallback mode with default content.",
  );
}

// Create a mock client for development when Supabase isn't configured
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () =>
          Promise.resolve({
            data: null,
            error: { code: "MOCK_ERROR", message: "Supabase not configured" },
          }),
      }),
    }),
    upsert: () =>
      Promise.resolve({ error: { message: "Supabase not configured" } }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    signInWithPassword: () =>
      Promise.resolve({ error: { message: "Supabase not configured" } }),
    signOut: () => Promise.resolve({ error: null }),
  },
  storage: {
    from: () => ({
      upload: () =>
        Promise.resolve({ error: { message: "Supabase not configured" } }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
      remove: () => Promise.resolve({ error: null }),
    }),
  },
  channel: () => ({
    on: () => ({ subscribe: () => {} }),
  }),
  removeChannel: () => {},
});

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

export const isSupabaseReady = isSupabaseConfigured;

// Database types
export interface PageContent {
  id?: string;
  slug: string;
  content: any;
  updated_at?: string;
}

export interface DatabaseSchema {
  public: {
    Tables: {
      pages: {
        Row: PageContent;
        Insert: Omit<PageContent, "id" | "updated_at">;
        Update: Partial<Omit<PageContent, "id">>;
      };
    };
  };
}
