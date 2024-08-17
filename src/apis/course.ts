import http from "@/utils/http";

export const videoAddSubtitleAPI = (video: string) => {
  return http({
    url: "/python/getVideo",
    method: "POST",
    data: {
      video,
    },
  });
};

export const getVieoVttAPI=(video:string)=>{
  return http({
    url:"/python/getVtt",
    method:"POST",
    data:{
      video
    }
  })
}

export const setCourseClassAPI=(courseId:number,classIdList:any[])=>{
  return http({
    url:'/course/set_class',
    method:"PUT",
    data:{
      courseId,classIdList
    }
  })
}

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
  image: string,
  mindMap:string
) => {
  return http({
    url: "/course",
    method: "PUT",
    data: {
      id,
      courseName,
      createTime,
      image,
      mindMap
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
    method: "DELETE",
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

export const teacherGetKnowledgeChartByCourseAPI = (courseId: number) => {
  return http({
    url: "/course/create-knowledge-graph",
    method: "PUT",
    params: {
      courseId,
    },
  });
};

export const getKnowledgeChartAPI = (courseId: number) => {
  return http({
    url: "/course/get-knowledge-graph/" + courseId,
    method: "GET",
  });
};

export const createMindMapByCourseIdAPI = (courseId: number) => {
  return http({
    url: "/course/create-mindMap/" + courseId,
    method: "GET",
  });
};

export const getMindMapByCourseIdAPI = (courseId: number) => {
  return http({
    url: "/course/get-mindMap/" + courseId,
    method: "GET",
  });
};

export const getPPTAPI = (query: string = "") => {
  return http({
    url: "/course/createPPT",
    method: "GET",
    params: {
      query,
    },
  });
};

export const recommedStudyPathAPI = (query: string = "ff") => {
  return http({
    url: "/course/createPath",
    method: "GET",
    params: {
      query,
    },
  });
};
