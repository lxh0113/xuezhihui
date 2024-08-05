import http from "@/utils/http";

export const teacherMarkSingleQuestionAPI = (
  title: string,
  type: string,
  studentAnswer: string,
  questionScore: number,
  correctAnswer: string
) => {
  return http({
    url: "/python/marking",
    method: "POST",
    data: {
      title,
      type,
      studentAnswer,
      questionScore,
      correctAnswer,
    },
  });
};

export const markAllQuestionAPI = (
  data: {
    title: string;
    type: string;
    studentAnswer: string;
    questionScore: number;
    correctAnswer: string;
  }[]
) => {
  return http({
    url: "/python/markings",
    method: "POST",
    data,
  });
};

export const teacherGetPaperQuestionInfoAPI = (
  files: string[],
  type: number
) => {
  return http({
    url: "/python/getQuestionByImage",
    method: "POST",
    data: {
      files,
      type,
    },
  });
};

export const teacherGetStudentInfoAPI = (files: string[]) => {
  return http({
    url: "/python/getStudentInfo",
    method: "POST",
    data: {
      files,
    },
  });
};

export const teacherGetAnswerByDocAPI = (file: string) => {
  return http({
    url: "/python/getAnswerInfo",
    method: "POST",
    data: {
      file,
    },
  });
};

export const teacherSaveMarkingAPI = (data: {
  id: number;
  courseId: number;
  teacherId: number;
  title: string;
  questionsImage: string;
  questions: string;
  answersDocx: string;
  answers: string;
  score: number;
  studentTestPapers: [
    {
      id: number;
      name: string;
      number: string;
      className: string;
      content: string;
      studentScore: number;
    }
  ];
}) => {
  return http({
    url: "/testPaper/saveTestPaper",
    method: "POST",
    data,
  });
};

export const teacherCompleteMarkingAPI = (id: number) => {
  return http({
    url: "/testPaper/finishTestPaper",
    method: "POST",
    params: {
      id,
    },
  });
};

export const teacherAddPaperAPI = (teacherId: number, courseId: number) => {
  return http({
    url: "/testPaper/addTestPaper",
    method: "POST",
    params: {
      teacherId,
      courseId,
    },
  });
};

export const teacherSavePaperInfoAPI = (
  id: number,
  title: string,
  questionsImage: string,
  questions: string,
  score: number
) => {
  return http({
    url: "/testPaper/saveQuestionInfo",
    method: "POST",
    data: {
      id,
      title,
      questionsImage,
      questions,
      score,
    },
  });
};

export const teacherGetPaperInfoAPI = (id: number) => {
  return http({
    url: "/testPaper/getQuestionInfo",
    method: "GET",
    params: {
      id,
    },
  });
};

export const teacherSavePaperAnswerAPI = (
  id: number,
  answersDocx: string,
  answers: string
) => {
  return http({
    url: "/testPaper/saveTestPaperAnswer",
    method: "POST",
    data: {
      id,
      answersDocx,
      answers,
    },
  });
};

export const teacherGetPaperAnswerAPI = (id: number) => {
  return http({
    url: "/testPaper/getTestPaperAnswer",
    method: "GET",
    params: {
      id
    },
  });
};

export const teacherUploadZipAPI = (testId: number, file: FormData) => {
  return http({
    url: "/testPaper/uploadFiles",
    method: "POST",
    params: {
      testId,
    },
    data: file,
  });
};

export const teacherGetAllStudentPaperAPI = (testId: number) => {
  return http({
    url: "/testPaper/getAllTestPaper",
    method: "GET",
    params: {
      testId,
    },
  });
};

export const teacherSaveStudentAnswerAPI = (
  testId: number,
  name: string,
  number: string,
  className: string,
  content: string,
  testPaperImages: string[],
  studentScore: number
) => {
  return http({
    url: "/testPaper/saveStudentAnswer",
    method: "POST",
    data: {
      testId,
      name,
      number,
      className,
      content,
      testPaperImages,
      studentScore,
    },
  });
};

export const teacherGetStudentAnswerAPI = (
  testId: number,
  images: string[]
) => {
  return http({
    url: "/testPaper/getStudentAnswer",
    method: "POST",
    data: {
      testId,
      images,
    },
  });
};
