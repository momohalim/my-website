import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle size
    minify: "esbuild", // Use esbuild instead of terser for faster builds
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          supabase: ["@supabase/supabase-js", "@supabase/ssr"],
          query: ["@tanstack/react-query"],
          icons: ["lucide-react"],
        },
      },
    },
    // Enable compression
    cssCodeSplit: true,
    sourcemap: mode === "development",
    target: "esnext",
    // Increase chunk size warning limit for production
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "lucide-react",
      "@supabase/supabase-js",
      "@tanstack/react-query",
    ],
  },
  // Additional performance optimizations
  ssr: {
    noExternal: ["@radix-ui/*"],
  },
}));
