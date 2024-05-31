import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueTypeImports from 'vite-plugin-vue-type-imports';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    AutoImport({
      imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "@vueuse/head",
          "@vueuse/core",
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/composables/**", "src/stores", "src/modules", "src/utils"],
      vueTemplate: true,
    }),
    Components({
      dts: true,
      dirs: ["src/components", "src/elements"],
    }),
    Pages({
      dirs: "src/pages",
    }),
    Layouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "main",
    }),
    Vue(),
    VueTypeImports(),
  ]
})
