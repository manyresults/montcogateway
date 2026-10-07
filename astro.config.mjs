// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Fully static output (dist/). Vercel serves it with no adapter.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
