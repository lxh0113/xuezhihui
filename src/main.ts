import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入echarts
import * as echarts from 'echarts';//引入echarts

import "video.js/dist/video-js.css";

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, { size: 'large', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// echarts 使用
app.config.globalProperties.$echarts = echarts;//全局使用

app.mount('#app')
