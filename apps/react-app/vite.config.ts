import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@repo/shared-ui': path.resolve(__dirname, '../../packages/shared-ui/src'),
      // '@repo/tailwind-config': path.resolve(__dirname, '../../packages/tailwind-config'),
    },
  },
});
