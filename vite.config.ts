import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  publicDir: 'public', // Specify the public directory
  root: './', // Ensure the root is correctly set
  build: {
    rollupOptions: {
      input: './public/index.html', // Explicitly specify the entry point
    },
  },
});