import { createRouter, createWebHistory } from "vue-router";
import { getRouter } from "@/utils/router";

// 公共模块
import Login from "@/views/login/index.vue";
import Register from "@/views/register/index.vue";
import ForgetPwd from "@/views/forgetPwd/index.vue";

import NoPage from "@/views/noPage/noPage.vue";

import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import type { RouteRecordRaw } from 'vue-router'

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
    path: "/404",
    name: "NoPage404",
    component: NoPage,
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

    const myRouter:RouteRecordRaw=getRouter(identity)

    router.addRoute(myRouter)


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
    if (isLogin.value === false) {
      // alert(3);

      const res = await setRouter(user.value.identity);

      // changeIsLogin(true);
      isLogin.value = true;

      if (res === true) {
        next({ ...to, replace: true });
      } else next(false);

      // next('/')

      return;
    }

    next();
  }
});

export default router;

export const addRouters=(identity:number)=>{

  console.log(getRouter(identity))
  router.addRoute(getRouter(identity))
}