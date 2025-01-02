import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@popperjs/core": "@popperjs/core/dist/umd/popper.min.js",
    },
  },
});
