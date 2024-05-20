import { createApp } from "vue";
import { createPinia } from "pinia";
// import piniaPluginPersist from 'pinia-plugin-persist'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 引入mock文件
import './mock' // mock 方式，正式发布时，注释掉该处即可

// 导入echarts
import * as echarts from "echarts"; //引入echarts

import "video.js/dist/video-js.css";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);

app.use(ElementPlus, { size: "large", zIndex: 3000 });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// echarts 使用
app.config.globalProperties.$echarts = echarts; //全局使用

app.mount("#app");

/**
 * 测试环境下 引入自定义的mockRequest
 * 因为mockRequest不是默认导出的：export default{}
 * 所以引入时需要加大括号，这种可以引入多个
 */
// if (process.env.NODE_ENV === "development") {
//   const { mockRequest } = require("../mock");
//   mockRequest();
// }
