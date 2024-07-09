/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module "vue"

declare module "@/types/home.d.ts";

declare module "mockjs";
