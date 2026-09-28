import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(rootDirectory, "index.html"),
        resolve(rootDirectory, "about-us/index.html"),
        resolve(rootDirectory, "our-services/index.html"),
        resolve(rootDirectory, "projects/index.html"),
        resolve(rootDirectory, "why-choose-us/index.html"),
        resolve(rootDirectory, "our-process/index.html"),
        resolve(rootDirectory, "blogs/index.html"),
        resolve(rootDirectory, "contact/index.html"),
        resolve(rootDirectory, "get-a-quote/index.html"),
      ],
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, "/");
          if (normalized.includes("/node_modules/three/")) return "three";
          if (normalized.includes("/node_modules/vue/") || normalized.includes("/node_modules/@vue/")) return "vue";
        },
      },
    },
  },
});
