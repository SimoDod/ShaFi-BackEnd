import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
    outDir: "../backend/dist",
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
