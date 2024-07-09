import { type NavList } from "../types/home.d";

const studentCourseNavList: NavList = [
  { path: "/home", icon: "iconfont icon-home", text: "首页" },
  { path: "/task", icon: "iconfont icon-task", text: "任务点" },
  { path: "/interaction", icon: "iconfont icon-Interaction", text: "互动" },
  {
    path: "/homework",
    icon: "iconfont icon-AfterclassHomework-Outlined",
    text: "作业",
  },
  { path: "/exam", icon: "iconfont icon-examination", text: "考试" },
  { path: "/data", icon: "iconfont icon-document", text: "资料" },
  { path: "/records", icon: "iconfont icon-question-bank", text: "学习记录" },
  { path: "", icon: "iconfont icon-logout", text: "退课" },
];

const teacherCourseNavList: NavList = [
  { path: "/home", icon: "iconfont icon-home", text: "首页" },
  { path: "/activities", icon: "iconfont icon-Interaction", text: "活动" },
  {
    path: "/homework",
    icon: "iconfont icon-AfterclassHomework-Outlined",
    text: "作业",
  },
  { path: "/exam", icon: "iconfont icon-examination", text: "考试" },
  {
    path: "/questions",
    icon: "iconfont icon-question-bank",
    text: "题库",
  },
  { path: "/information", icon: "iconfont icon-document", text: "资料" },
];

export const getCourseNavList = (identity: number): NavList => {
  if (identity === 1) return studentCourseNavList;
  else if (identity === 2) return teacherCourseNavList;
  else return [];
};
