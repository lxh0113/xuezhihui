import { createApp } from "vue";
import { createPinia } from "pinia";
// import piniaPluginPersist from 'pinia-plugin-persist'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import Chat from 'vue3-beautiful-chat'

// main.ts
// import 'naive-chat/dist/style.css'


// 引入mock文件
// import "./mock"; // mock 方式，正式发布时，注释掉该处即可

// 导入echarts
import * as echarts from "echarts"; //引入echarts

import "video.js/dist/video-js.css";

import App from "./App.vue";
import router from "./router";

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

import { useRouterStore } from "./stores/routerStore";

const app = createApp(App);

const pinia = createPinia();

// pinia.use(piniaPluginPersist)
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

let routerStore = useRouterStore();
routerStore.setMyRouter();

app.use(router);

app.use(Chat)
// alert("想s")

app.use(ElementPlus, { size: "large", locale: zhCn, zIndex: 3000 });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// echarts 使用
app.config.globalProperties.$echarts = echarts; //全局使用

// app.use(VueQuillEditor /* { default global options } */);


app.mount("#app");
