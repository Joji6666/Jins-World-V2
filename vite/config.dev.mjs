import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"]
        }
      }
    }
  },
  server: {
    port: 4444
  },
  optimizeDeps: {
    include: ["phaser", "phaser3-rex-plugins/templates/ui/ui-plugin.js"]
  }
});
