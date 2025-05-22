import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './client/src')
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, './shared')
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, './attached_assets')
      }
    ]
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
