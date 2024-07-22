import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { getRouter } from "@/utils/router";

// 公共模块
import Login from "@/views/login/index.vue";
import Register from "@/views/register/index.vue";
import ForgetPwd from "@/views/forgetPwd/index.vue";

import NoPage from "@/views/noPage/noPage.vue";

import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import component from "../../env";

// const userStore=useUserStore()

const basicRouter = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/forget",
    name: "forget",
    component: ForgetPwd,
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat/index.vue"),
  },
  {
    path: "/404",
    name: "NoPage404",
    component: NoPage,
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: basicRouter,
});

export const clearRouter = () => {
  router.routes = basicRouter;
};

const setRouter = async (identity: number) => {
  return new Promise((resolve, reject) => {
    clearRouter();
    console.log("看谁先到222");
    console.log(identity);

    router.routes=basicRouter;
    console.log(router.routes)

    const myRouter: RouteRecordRaw = getRouter(identity);

    router.addRoute(myRouter);
    
    console.log(router.getRoutes())
    resolve(true);
  });
};

router.beforeEach(async (to, from, next) => {
  // 判断有没有登录
  const userStore = useUserStore();

  const { isLogin, user } = storeToRefs(userStore);
  console.log(isLogin.value, user.value);

  if (to.name == "login") {
    next();
    return;
  }

  if (user.value === null) {
    if (to.name == "login") {
      next();
    } else {
      // alert(2)

      router.push("/login");
    }
  } else {

    if(user.value.account==='test')
    {
      router.push('/login')
      return 
    }

    if (isLogin.value === false) {
      // alert(3);

      console.log(user.value.identity);

      const res = await setRouter(user.value.identity);

      // (true);
      isLogin.value = true;

      console.log(res)

      if (res === true) {
        next('/');
      } else next(false);

      return;
    } 

    next();
  }
});

export default router;

export const addRouters = (identity: number) => {
  console.log(getRouter(identity));
  router.addRoute(getRouter(identity));
};
