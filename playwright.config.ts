import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:5174', channel: 'msedge' },
  webServer: {
    command: 'npm.cmd run dev -- --host 127.0.0.1 --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174',
    env: { VITE_SUPABASE_URL: 'https://cv-test.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-public-key' },
  },
})
