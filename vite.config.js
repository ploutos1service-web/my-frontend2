import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: process.env.VITE_BASE_PATH || 'my-frontend2',
      server: {
        port: 3000,
        host: '0.0.0.0',
        fs: {
          // Allow serving files from project root and parent directory in case imports
          // reference files outside the current working directory (fixes "outside of Vite serving allow list").
          allow: [path.resolve(__dirname), path.resolve(__dirname, '..')]
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
