import { createRouter, createWebHistory } from "vue-router";

// 公共模块
import Login from "@/views/login/index.vue";
import Home from "@/views/home/index.vue";
import Register from "@/views/register/index.vue";
import ForgetPwd from "@/views/forgetPwd/index.vue";
import Notice from "@/views/notice/index.vue";
import Profile from "@/views/profile/index.vue";
import ProfileInformation from "@/views/profile/components/information.vue";
import ProfileChangePassword from "@/views/profile/components/changePassword.vue";
import ProfileVerifySchool from "@/views/profile/components/verifySchool.vue";
import ProfileByebye from "@/views/profile/components/byebye.vue";

// 学生模块
import StudentCourse from "@/views/student/course/index.vue";
import StudentMistakes from "@/views/student/mistakes/index.vue";
import StudentCourseLearn from "@/views/student/course/components/learn.vue";
import StudentCourseTeach from "@/views/student/course/components/teach.vue";
import StudentCourseHome from "@/views/student/courseHome/index.vue";

import StudentCourseHomePage from "@/views/student/courseHome/home/index.vue";
import StudentCourseTask from "@/views/student/courseHome/task/index.vue";
import StudentCourseInteraction from "@/views/student/courseHome/interaction/index.vue";
import StudentCourseHomework from "@/views/student/courseHome/homework/index.vue";
import StudentCourseExam from "@/views/student/courseHome/exam/index.vue";
import StudentCourseData from "@/views/student/courseHome/data/index.vue";
import StudentCourseRecords from "@/views/student/courseHome/records/index.vue";
import StudentTaskHome from "@/views/student/courseHome/task/components/home.vue";
import StudentTaskDetails from "@/views/student/courseHome/task/components/task.vue";

// 老师模块
import TeacherCourse from "@/views/teacher/course/index.vue";
import TeacherPaper from "@/views/teacher/paper/index.vue";
import TeacherQuestions from "@/views/teacher/questions/index.vue";
import TeacherClass from "@/views/teacher/class/index.vue";
import TeacherCourseLearn from "@/views/teacher/course/components/learn.vue";
import TeacherCourseTeach from "@/views/teacher/course/components/teach.vue";

import TeacherCourseHome from "@/views/teacher/courseHome/index.vue";
import TeacherCourseHomePage from "@/views/teacher/courseHome/home/index.vue";
import TeacherCourseActivities from "@/views/teacher/courseHome/activities/index.vue";
import TeacherCourseHomework from "@/views/teacher/courseHome/homework/index.vue";
import TeacherCourseExam from "@/views/teacher/courseHome/exam/index.vue";
import TeacherCourseInformation from "@/views/teacher/courseHome/information/index.vue";
import TeacherClassDetails from "@/views/teacher/class/components/class.vue";
import TeacherQuestionsDetails from "@/views/teacher/questions/components/details.vue";
import TeacherPaperDetails from "@/views/teacher/paper/components/details.vue";

import NoPage from "@/views/noPage/noPage.vue";

import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

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

const setRouter = async (identity: string) => {
  return new Promise((resolve, reject) => {
    clearRouter();
    console.log("看谁先到222");
    console.log(identity);
    if (identity === "student") {
      // router.addRoute();

      router.addRoute({
        path: "/",
        component: Home,
        redirect: "/student/course",
        children: [
          {
            path: "/course/:id",
            // redirect:'/course/home'
            component: StudentCourseHome,
            children: [
              { path: "home", component: StudentCourseHomePage },
              {
                path: "task",
                component: StudentCourseTask,
                redirect: (to) => {
                  // 重定向到on页面，并将路由参数id传递给子路由
                  return {
                    name: "studentTaskHome",
                    params: { id: to.params.id },
                  };
                },
                children: [
                  {
                    path: "home",
                    component: StudentTaskHome,
                    name: "studentTaskHome",
                  },
                  { path: ":id", component: StudentTaskDetails },
                ],
              },
              {
                path: "interaction",
                component: StudentCourseInteraction,
              },
              { path: "homework", component: StudentCourseHomework },
              { path: "exam", component: StudentCourseExam },
              { path: "data", component: StudentCourseData },
              { path: "records", component: StudentCourseRecords },
            ],
          },
          {
            path: "student",
            redirect: "/student/course",
            children: [
              {
                path: "course",
                component: StudentCourse,
                redirect: "/student/course/learn",
                name: "StudentCourse",
                children: [
                  { path: "learn", component: StudentCourseLearn },
                  { path: "teach", component: StudentCourseTeach },
                ],
              },
              {
                path: "mistakes",
                component: StudentMistakes,
                name: "StudentMistakes",
              },
              { path: "notice", component: Notice, name: "notice" },
              {
                path: "profile",
                component: Profile,
                name: "profile",
                children: [
                  { path: "information", component: ProfileInformation },
                  { path: "changePassword", component: ProfileChangePassword },
                  { path: "verifySchool", component: ProfileVerifySchool },
                  { path: "byebye", component: ProfileByebye },
                ],
              },
            ],
          },
        ],
      });
    } else if (identity === "teacher") {
      // router.addRoute();
      router.addRoute({
        path: "/",
        component: Home,
        redirect: "/teacher/course",
        children: [
          {
            path: "course/:id",
            // redirect:'/course/home'
            component: TeacherCourseHome,
            children: [
              { path: "home", component: TeacherCourseHomePage },
              {
                path: "activities",
                component: TeacherCourseActivities,
              },
              { path: "homework", component: TeacherCourseHomework },
              { path: "exam", component: TeacherCourseExam },
              { path: "information", component: TeacherCourseInformation },
            ],
          },
          {
            path: "teacher",
            redirect: "/teacher/course",
            children: [
              {
                path: "course",
                component: TeacherCourse,
                redirect: "/teacher/course/teach",
                children: [
                  { path: "learn", component: TeacherCourseLearn },
                  { path: "teach", component: TeacherCourseTeach },
                ],
              },
              {
                path: "paper",
                component: TeacherPaper,
                // children: [],
              },
              { path: "paper/:id", component: TeacherPaperDetails },
              {
                path: "questions",
                component: TeacherQuestions,
                children: [
                  { path: "details", component: TeacherQuestionsDetails },
                ],
              },
              {
                path: "class",
                component: TeacherClass,
                children: [{ path: ":id", component: TeacherClassDetails }],
              },
              { path: "notice", component: Notice, name: "notice" },
              {
                path: "profile",
                component: Profile,
                name: "profile",
                children: [
                  { path: "information", component: ProfileInformation },
                  { path: "changePassword", component: ProfileChangePassword },
                  { path: "verifySchool", component: ProfileVerifySchool },
                  { path: "byebye", component: ProfileByebye },
                ],
              },
            ],
          },
        ],
      });
    }

    router.addRoute({
      path: "/:pathMatch(.*)",
      redirect: "/404",
    });

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
    alert(2);
    if (isLogin.value === false) {
      alert(3);

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
