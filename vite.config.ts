import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@sections': path.resolve(__dirname, './src/components/sections'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@content': path.resolve(__dirname, './src/content'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
});
