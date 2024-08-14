import type { RouteRecordRaw } from "vue-router";

const studentRouter: RouteRecordRaw = {
  path: "/",
  name: "xuezhihui",
  //   component: () => import("@/views/home/index.vue"),
  redirect: "/student/course",
  children: [
    {
      path: "studentRoute",
      component: () =>
        import("@/views/student/courseHome/home/components/studentRoute.vue"),
    },
    {
      path: "course/:id/dohomework/:assignmentId",
      component: () =>
        import("@/views/student/courseHome/homework/components/doHomework.vue"),
    },
    {
      path: "course/:id/exam/:assignmentId",
      component: () =>
        import("@/views/student/courseHome/exam/components/doExam.vue"),
    },
    {
      path: "course/:id/knowledge",
      component: () =>
        import("@/views/student/courseHome/task/knowledge/index.vue"),
    },
    {
      path: "course/:id/braveChart",
      component: () =>
        import("@/views/student/courseHome/task/markdown/index.vue"),
    },
    {
      path: "course/:id",
      redirect: (to) => {
        // 重定向到on页面，并将路由参数id传递给子路由
        return {
          name: "studentCourseHome",
          params: { id: to.params.id },
        };
      },
      component: () => import("@/views/student/courseHome/index.vue"),
      children: [
        {
          path: "home",
          name: "studentCourseHome",
          component: () => import("@/views/student/courseHome/home/index.vue"),
        },
        {
          path: "task",
          component: () => import("@/views/student/courseHome/task/index.vue"),
          redirect: (to) => {
            // 重定向到on页面，并将路由参数id传递给子路由
            return {
              name: "studentTaskHome",
              params: { taskId: to.params.taskId },
            };
          },
          children: [
            {
              path: "home",
              component: () =>
                import("@/views/student/courseHome/task/components/home.vue"),
              name: "studentTaskHome",
            },
            {
              path: ":taskId",
              component: () =>
                import("@/views/student/courseHome/task/components/task.vue"),
            },
          ],
        },
        {
          path: "interaction/:activityId",
          component: () =>
            import("@/views/student/courseHome/interaction/components/do.vue"),
        },
        {
          path: "interaction/choose/:activityId",
          component: () =>
            import(
              "@/views/student/courseHome/interaction/components/choose.vue"
            ),
        },
        {
          path: "interaction/gesture/:gestureId",
          component: () =>
            import(
              "@/views/student/courseHome/interaction/components/gesture.vue"
            ),
        },
        {
          path: "interaction",
          component: () =>
            import("@/views/student/courseHome/interaction/index.vue"),
        },
        {
          path: "homework",
          component: () =>
            import("@/views/student/courseHome/homework/index.vue"),
        },
        {
          path: "exam",
          component: () => import("@/views/student/courseHome/exam/index.vue"),
        },
        {
          path: "data",
          component: () => import("@/views/student/courseHome/data/index.vue"),
        },
        {
          path: "records",
          component: () =>
            import("@/views/student/courseHome/records/index.vue"),
        }
      ],
    },
    {
      path: "student",
      component: () => import("@/views/home/index.vue"),
      redirect: "/student/course",
      children: [
        {
          path: "course",
          component: () => import("@/views/student/course/index.vue"),
          redirect: "/student/course/learn",
          name: "StudentCourse",
          children: [
            {
              path: "learn",
              component: () =>
                import("@/views/student/course/components/learn.vue"),
            },
            {
              path: "teach",
              component: () =>
                import("@/views/student/course/components/teach.vue"),
            },
          ],
        },
        {
          path: "mistakes",
          component: () => import("@/views/student/mistakes/index.vue"),
          name: "StudentMistakes",
        },
        {
          path: "notice",
          component: () => import("@/views/notice/index.vue"),
          name: "notice",
        },
        {
          path: "profile",
          redirect: (to) => {
            return {
              name: "studentProfileInformation",
            };
          },
          component: () => import("@/views/profile/index.vue"),
          name: "profile",
          children: [
            {
              path: "information",
              name: "studentProfileInformation",
              component: () =>
                import("@/views/profile/components/information.vue"),
            },
            {
              path: "changePassword",
              component: () =>
                import("@/views/profile/components/changePassword.vue"),
            },
            {
              path: "verifySchool",
              component: () =>
                import("@/views/profile/components/verifySchool.vue"),
            },
            {
              path: "byebye",
              component: () => import("@/views/profile/components/byebye.vue"),
            },
          ],
        },
        {
          path: "logout",
          redirect: "/login",
        },
      ],
    },
  ],
};

const teacherRouter: RouteRecordRaw = {
  path: "/",
  name: "xuezhihui",
  //   component: () => import("@/views/home/index.vue"),
  redirect: "/teacher/course",
  children: [
    {
      path: "/course/:id/homework/details/:assignmentId/:studentAssignmentId",
      component: () =>
        import("@/views/teacher/courseHome/homework/components/mark.vue"),
    },
    {
      path: "/course/:id/exam/details/:assignmentId/:studentAssignmentId",
      component: () =>
        import("@/views/teacher/courseHome/exam/components/mark.vue"),
    },

    {
      path: "/course/:id/knowledgeChart",
      component: () =>
        import("@/views/teacher/courseHome/home/knowledge/index.vue"),
    },
    {
      path: "/course/:id/markdown",
      component: () =>
        import("@/views/teacher/courseHome/home/markdown/index.vue"),
    },
    // 上传试卷的模块
    {
      path: "upload/origin/:paperId",
      component: () =>
        import(
          "@/views/teacher/courseHome/exam/uploadPaper/uploadOriginPaper.vue"
        ),
    },
    {
      path: "upload/answer/:paperId",
      component: () =>
        import(
          "@/views/teacher/courseHome/exam/uploadPaper/uploadPaperAnswer.vue"
        ),
    },
    {
      path: "upload/student/:paperId",
      component: () =>
        import("@/views/teacher/courseHome/exam/uploadPaper/uploadStudent.vue"),
    },
    {
      path: "upload/result/:paperId",
      component: () =>
        import("@/views/teacher/courseHome/exam/uploadPaper/paperResult.vue"),
    },
    {
      path: "course/:id",
      // redirect:'/course/home'
      redirect: (to) => {
        // 重定向到on页面，并将路由参数id传递给子路由
        return {
          name: "teacherCourseHome",
          params: { id: to.params.id },
        };
      },

      component: () => import("@/views/teacher/courseHome/index.vue"),

      children: [
        {
          path: "home",
          name: "teacherCourseHome",
          component: () => import("@/views/teacher/courseHome/home/index.vue"),
        },
        {
          path: "activities",
          component: () =>
            import("@/views/teacher/courseHome/activities/index.vue"),
        },
        {
          path: "activities/signIn",
          redirect: (to) => {
            return {
              name: "ordinarySignIn",
              params: { id: to.params.id },
            };
          },
          component: () =>
            import(
              "@/views/teacher/courseHome/activities/components/signIn.vue"
            ),
          children: [
            {
              path: "intelligent",
              name: "intelligent",
              component: () =>
                import(
                  "@/views/teacher/courseHome/activities/components/intelligent.vue"
                ),
            },
            {
              path: "ordinary",
              name: "ordinarySignIn",
              component: () =>
                import(
                  "@/views/teacher/courseHome/activities/components/ordinary.vue"
                ),
            },
            {
              path: "erCode",
              component: () =>
                import(
                  "@/views/teacher/courseHome/activities/components/erCode.vue"
                ),
            },
            {
              path: "gesture",
              component: () =>
                import(
                  "@/views/teacher/courseHome/activities/components/gesture.vue"
                ),
            },
            {
              path: "number",
              component: () =>
                import(
                  "@/views/teacher/courseHome/activities/components/number.vue"
                ),
            },
          ],
        },
        {
          path: "activities/choosePeople",
          component: () =>
            import(
              "@/views/teacher/courseHome/activities/components/choosePeople.vue"
            ),
        },
        {
          path: "activities/:activityId",
          component: () =>
            import(
              "@/views/teacher/courseHome/activities/components/viewDetails.vue"
            ),
        },
        {
          path: "homework",
          redirect: (to) => {
            // 重定向到on页面，并将路由参数id传递给子路由
            return {
              name: "teacherHomeworkIndex",
              params: { id: to.params.id },
            };
          },
          children: [
            {
              path: "details/:assignmentId",
              component: () =>
                import(
                  "@/views/teacher/courseHome/homework/components/details.vue"
                ),
            },
            {
              path: "index",
              name: "teacherHomeworkIndex",
              component: () =>
                import("@/views/teacher/courseHome/homework/index.vue"),
            },
            {
              path: "addHomework",
              component: () =>
                import(
                  "@/views/teacher/courseHome/homework/components/add.vue"
                ),
            },
            {
              path:'editHomework/:assignmentId',
              component:()=>import("@/views/teacher/courseHome/homework/components/edit.vue")
            }
          ],
        },

        {
          path: "exam/addExam",
          component: () =>
            import("@/views/teacher/courseHome/exam/components/add.vue"),
        },
        {
          path: "exam/:assignmentId/analysis",
          component: () =>
            import("@/views/teacher/courseHome/exam/components/analysis.vue"),
        },
        {
          path: "exam/:assignmentId/analysis/:studentId",
          component: () =>
            import(
              "@/views/teacher/courseHome/exam/components/studentAnalysis.vue"
            ),
        },
        {
          path: "exam/details/:assignmentId",
          component: () =>
            import("@/views/teacher/courseHome/exam/components/details.vue"),
        },
        {
          path: "exam/uploadExam/:paperId",
          component: () =>
            import("@/views/teacher/courseHome/exam/components/uploadExam.vue"),
        },
        {
          path: "exam",
          component: () => import("@/views/teacher/courseHome/exam/index.vue"),
        },
        {
          path: "questions",
          component: () => import("@/views/teacher/questions/index.vue"),
        },
        {
          path: "questions/add",
          component: () =>
            import("@/views/teacher/questions/components/add.vue"),
        },
        {
          path: "questions/edit/:questionId",
          component: () =>
            import("@/views/teacher/questions/components/edit.vue"),
        },
        {
          path: "information",
          component: () =>
            import("@/views/teacher/courseHome/information/index.vue"),
        },
      ],
    },
    {
      path: "teacher",
      component: () => import("@/views/home/index.vue"),
      redirect: "/teacher/course",
      children: [
        {
          path: "course",
          component: () => import("@/views/teacher/course/index.vue"),
          redirect: "/teacher/course/teach",
          children: [
            {
              path: "learn",
              component: () =>
                import("@/views/teacher/course/components/learn.vue"),
            },
            {
              path: "teach",
              component: () =>
                import("@/views/teacher/course/components/teach.vue"),
            },
          ],
        },
        {
          path: "paper",
          component: () => import("@/views/teacher/paper/index.vue"),
          // children: [],
        },
        {
          path: "paper/:id",
          component: () =>
            import("@/views/teacher/paper/components/details.vue"),
        },
        {
          path: "paper/:id/add",
          component: () => import("@/views/teacher/paper/components/add.vue"),
        },
        {
          path: "ai",
          component: () => import("@/views/teacher/ai/index.vue"),
          redirect: "/teacher/ai/generate",
          children: [
            {
              path: "generate",
              component: () =>
                import("@/views/teacher/ai/components/generate.vue"),
            },
          ],
        },

        {
          path: "class",
          component: () => import("@/views/teacher/class/index.vue"),
          children: [
            {
              path: ":classId",
              component: () =>
                import("@/views/teacher/class/components/class.vue"),
            },
          ],
        },
        {
          path: "notice",
          component: () => import("@/views/notice/index.vue"),
          name: "notice",
        },
        {
          path: "profile",
          component: () => import("@/views/profile/index.vue"),
          name: "profile",
          redirect: (to) => {
            return {
              name: "teacherProfileInformation",
            };
          },
          children: [
            {
              path: "information",
              name: "teacherProfileInformation",
              component: () =>
                import("@/views/profile/components/information.vue"),
            },
            {
              path: "changePassword",
              component: () =>
                import("@/views/profile/components/changePassword.vue"),
            },
            {
              path: "verifySchool",
              component: () =>
                import("@/views/profile/components/verifySchool.vue"),
            },
            {
              path: "byebye",
              component: () => import("@/views/profile/components/byebye.vue"),
            },
          ],
        },
        {
          path: "logout",
          redirect: "/login",
        },
      ],
    },
  ],
};

export const getRouter = (identity: number): RouteRecordRaw => {
  if (identity === 1) return studentRouter;
  else return teacherRouter;
};
