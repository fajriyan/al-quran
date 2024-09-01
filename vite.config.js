import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Al Quran Digital",
        short_name: "Al Quran Digital",
        description: "Baca Al Quran dengan Mudah dan Praktis",
        theme_color: "#ffffff",
        icons: [
          {
            src: "favicon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
