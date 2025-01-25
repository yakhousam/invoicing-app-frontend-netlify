import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  publicDir: "public", // The directory to serve as the public directory
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
