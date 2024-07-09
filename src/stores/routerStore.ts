import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "./userStore";
import { getRouter } from "@/utils/router";
import { addRouters } from "@/router";

export const useRouterStore = defineStore(
  "router",
  () => {
    const userStore = useUserStore();

    const myRouter = ref<RouteRecordRaw>();

    const setMyRouter = () => {
      
        let identity = userStore.getUserInfo()?.identity;

        addRouters(identity)
      
    };

    return {
      setMyRouter,
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
