import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
