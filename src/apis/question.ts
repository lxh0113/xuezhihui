import http from "@/utils/http";

export const teacherViewCourseQuestionAPI = (courseId: number) => {
  return http({
    url: "/question/all/" + courseId,
    method: "GET",
  });
};

export const teacherPageSearchQuestionsAPI = (
  courseId: number,
  currentPage: number,
  pageSize: number
) => {
  return http({
    url: "/question/page/" + courseId + "/" + currentPage + "/" + pageSize,
    method: "GET",
  });
};

export const teacherAddSingleQuestionAPI = (data: {
  id: number;
  type: string;
  title: string;
  answer: string;
  answerAnalysis: string;
  courseId: number;
  courseName: string;
  creatorId: number;
  creatorName: string;
}) => {
  return http({
    url: "/question",
    method: "PUT",
    data,
  });
};

export const teacherAddQuestionAPI = (
  data: {
    id: number;
    type: string;
    title: string;
    answer: string;
    answerAnalysis: string;
    courseId: number;
    courseName: string;
    creatorId: number;
    creatorName: string;
  }[]
) => {
  return http({
    url: "/question/list",
    method: "GET",
    data,
  });
};

export const teacherModifyQuestionAPI = (data: {
  id: number;
  type: string;
  title: string;
  answer: string;
  answerAnalysis: string;
  courseId: number;
  courseName: string;
  creatorId: number;
  creatorName: string;
}) => {
  return http({
    url: "/question/mix-up",
    method: "PUT",
    data,
  });
};

export const teacherDeleteQuestionAPI = (questionId: number) => {
  return http({
    url: "/question/" + questionId,
    method: "DELETE",
  });
};

export const teacherGetQuestionDetailsAPI = (questionId: number) => {
  return http({
    url: "/question/" + questionId,
    method: "GET",
  });
};

export const studentViewCourseQuestionAPI = (
  studentId: number,
  courseId: number
) => {
  return http({
    url: "/question/mistakes",
    method: "GET",
    params: {
      studentId,
      courseId,
    },
  });
};

export const studentViewAllQuestionAPI = (studentId: number) => {
  return http({
    url: "/question/mistakes-all",
    method: "GET",
    params: {
      studentId,
    },
  });
};

export const studentViewQuestionDetailsAPI = (mistakeId: number) => {
  return http({
    url: "/question/mistake-detail/" + mistakeId,
    method: "GET",
  });
};

export const teacherGenerateQuestionsByAIAPI = (
  material: string,
  t: number,
  n1: number,
  n2: number,
  n3: number
) => {
  return http({
    url: "/question/generatedQuestions",
    method: "GET",
    params: {
      material,
      t,
      n1,
      n2,
      n3,
    },
  });
};

export const generateMistakesByInputAPI = (query: string = "") => {
  return http({
    url: "/question/createQuestion",
    method: "GET",
    params: {
      query,
    },
  });
};
