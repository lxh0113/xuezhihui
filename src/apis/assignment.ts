import http from "@/utils/http";

export const teacherGetAllClassAPI = () => {
  return http({
    url: "/assignment/class",
    method: "GET",
  });
};

export const studentGetAssignmentAPI = (
  studentId: number,
  courseId: number,
  operation: number,
  type: number
) => {
  return http({
    url: "/assignment",
    method: "GET",
    params: {
      studentId,
      courseId,
      operation,
      type,
    },
  });
};

export const studentGetAssignmentDetailsAPI = (
  studentId: number,
  assignmentId: number
) => {
  return http({
    url: "/assignment/" + studentId + "/" + assignmentId,
    method: "GET",
  });
};

export const studentDoAssignmentAPI = (
  studentId: number,
  assignmentId: number,
  operation: number,
  content: any[],
  type: number, //0 代表保存 1 代表提交
  examBeginTime?: string,
  examEndTime?: string
) => {
  return http({
    url: "/assignment",
    method: "PUT",
    data: {
      studentId,
      assignmentId,
      operation,
      content,
      type,
      examBeginTime,
      examEndTime,
    },
  });
};

export const teacherAddAssignmentAPI = (
  type: number,
  courseId: number,
  title: string,
  creatorId: number,
  content: {
    questionScore: number;
    studentScore: number;
    type: string;
    title: string;
    studentAnswer: string;
    questionComment: string;
    answer: string;
    answerAnalysis: string;
  }[],
  assignmentId: number | null
) => {
  return http({
    url: "/assignment/teacher",
    method: "PUT",
    data: {
      type,
      courseId,
      title,
      creatorId,
      content,
      assignmentId,
    },
  });
};

export const teacherPublishAssignmentAPI = (
  type: number,
  assignmentId: number,
  beginDate: string,
  endDate: string,

  examTime: number,
  classIdList: number[]
) => {
  return http({
    url: "/assignment/publish",
    method: "PUT",
    data: {
      type,
      assignmentId,
      beginDate,
      endDate,
      examTime,
      classIdList,
    },
  });
};

export const teacherDeleteAssignmentAPI = (assignmentId: number) => {
  return http({
    url: "/assignment/" + assignmentId,
    method: "DELETE",
  });
};

export const teacherModifyAssignmentStatusAPI = (
  assignmentId: number,
  state: number
) => {
  return http({
    url: "/assignment/state",
    method: "PUT",
    params: {
      assignmentId,
      state,
    },
  });
};

export const teacherMarkAssignmentAPI = (
  studentAssignmentId: number,
  teacherId: number,
  comment: string,
  content: {
    questionScore: number;
    studentScore: number;
    type: string;
    title: string;
    studentAnswer: string;
    questionComment: string;
    answer: string;
    answerAnalysis: string;
  }[]
) => {
  return http({
    url: "/assignment/correct",
    method: "PUT",
    data: {
      studentAssignmentId,
      teacherId,
      comment,
      content,
    },
  });
};

export const teacherViewAllCourseAssignmentAPI = (
  teacherId: number,
  state: number
) => {
  return http({
    url: "/assignment/exam/" + teacherId + "/" + state,
    method: "GET",
  });
};

export const teacherViewAllAssignmentAPI = (
  courseId: number,
  state: number,
  type: number
) => {
  return http({
    url: "/assignment/teacher",
    method: "GET",
    params: {
      courseId,
      state,
      type,
    },
  });
};

export const teacherViewAssignmentListAPI = (
  assignmentId: number,
  type: number,
  studentAssignmentState?: number
) => {
  return http({
    url: "/assignment/Submission_list",
    method: "GET",
    params: {
      assignmentId,
      type,
      studentAssignmentState,
    },
  });
};

export const teacherViewStudentAssignmentAPI = (
  studentAssignmentId: number
) => {
  return http({
    url: "/assignment/student/" + studentAssignmentId,
    method: "GET",
  });
};

export const correctAllAPI = (assignmentId: number, teacherId: number) => {
  return http({
    url: "/assignment/ai-correct-all/" + assignmentId + "/" + teacherId,
    method: "PUT",
  });
};

export const examAnalysisAPI = (courseId: number) => {
  return http({
    url: "/assignment/study_analysis",
    method: "GET",
    params: courseId,
  });
};
