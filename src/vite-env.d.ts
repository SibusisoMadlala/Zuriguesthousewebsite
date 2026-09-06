/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_SUPABASE_ROOM_STANDARD_ID?: string;
  readonly VITE_SUPABASE_ROOM_DELUXE_ID?: string;
  readonly VITE_SUPABASE_ROOM_KING_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
