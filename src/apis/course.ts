import http from "@/utils/http";

export const studentViewMyCourseAPI = (studentId: number) => {
  return http({
    url: "/course/courses/" + studentId,
    method: "GET",
  });
};

export const teacherViewMyTeachCourseAPI = (teacherId: number) => {
  return http({
    url: "/course/" + teacherId,
    method: "GET",
  });
};

export const teacherGetCourseDetailsAPI = (courseId: number) => {
  return http({
    url: "/course/detail/" + courseId,
    method: "GET",
  });
};

export const teacherAddCourseAPI = (
  id: number,
  courseName: string,
  createTime: string,
  image: string
) => {
  return http({
    url: "/course",
    method: "PUT",
    data: {
      id,
      courseName,
      createTime,
      image,
    },
  });
};

export const teacherDeleteCourseAPI = (courseId: number) => {
  return http({
    url: "/course/" + courseId,
    method: "DELETE",
  });
};

export const getAllChaptersAPI = (courseId: number) => {
  return http({
    url: "/course/chapters/" + courseId,
    method: "GET",
  });
};

export const teacherViewChapterAPI = (chapterId: number) => {
  return http({
    url: "/course/chapter/" + chapterId,
    method: "GET",
  });
};

export const teacherAddChapterAPI = (data: {
  id: number;
  chapterTitle: string;
  chapterNumber: number;
  level: number;
  fatherId: number;
  courseId: number;
  taskPointTitle: string;
  content: string;
  type: string;
}) => {
  return http({
    url: "/course/chapter",
    method: "PUT",
    data,
  });
};

export const teacherModifyChaptersAPI = (data: {
  id: number;
  chapterTitle: string;
  chapterNumber: number;
  level: number;
  fatherId: number;
  courseId: number;
  taskPointTitle: string;
  content: string;
  type: string;
}) => {
  return http({
    url: "/course/chapter/update",
    method: "PUT",
    data,
  });
};

export const teacherDeleteChapterAPI = (chapterId: number) => {
  return http({
    url: "/course/chapter/" + chapterId,
    method: "PUT",
  });
};

export const studentGetRecordsAPI = (studentId: number, courseId: number) => {
  return http({
    url: "/course/study-record",
    method: "GET",
    params: {
      studentId,
      courseId,
    },
  });
};
