import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const optimizeDepsElementPlusIncludes = ["element-plus/es"]
  fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
    fs.access(
      `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
      (err) => {
        if (!err) {
          optimizeDepsElementPlusIncludes.push(
            `element-plus/es/components/${dirname}/style/css`
          )
        }
      }
    )
  });
  return {
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes,
    },
    plugins: [
      vue(),
      VueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        imports: ["vue", "vue-router"],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 这里的路径要和刚刚写的 index.scss 文件路径一致
          additionalData: ` @use "@/styles/theme.scss" as *;
            @use "@/styles/element/index.scss" as *;
          `,
        },
      },
    },
    server: {
      proxy: {
        // 字符串简写写法：http://localhost:5173/oauth -> https://aip.baidubce.com/oauth
        "/oauth": "https://aip.baidubce.com",
        "/text2audio": "https://tsn.baidu.com",
        "/server_api": "http://vop.baidu.com",
      },
    },
  };
});
