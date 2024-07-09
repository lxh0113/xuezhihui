import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver({importStyle: 'sass'})],
      imports: ['vue', 'vue-router']
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle: 'sass'})],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 这里的路径要和刚刚写的 index.scss 文件路径一致
        additionalData: `
          @use "@/styles/theme.scss" as *;
          @use "@/styles/element/index.scss" as *;
        `,
      },
    },
  },
})
