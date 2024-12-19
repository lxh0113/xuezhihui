import http from "@/utils/http";

export const teacherCreateSignInAPI = (
  courseId: number,
  classId: number,
  teacherId: number,
  title: string,
  beginTime: string,
  endTime: string,
  type: number,
  answer: string,
  answerImage: string
) => {
  return http({
    url: "/activity/addSigin",
    method: "PUT",
    data: {
      courseId,
      classId,
      teacherId,
      title,
      beginTime,
      endTime,
      type,
      answer,
      answerImage,
    },
  });
};

export const teacherCreateChoosePeopleAPI = (
  courseId: number,
  classId: number,
  teacherId: number,
  title: string,
  beginTime: string,
  endTime: string,
  type: number,
  answerImage: string
) => {
  return http({
    url: "/activity/addChooser",
    method: "PUT",
    data: {
      courseId,
      classId,
      teacherId,
      title,
      beginTime,
      endTime,
      type,
      answerImage,
    },
  });
};

export const teacherViewActivityAPI = (activityId: number) => {
  return http({
    url: "/activity/" + activityId,
    method: "GET",
  });
};

export const teacherGetAllActivityAPI = (courseId: number, classId: number) => {
  return http({
    url: "/activity/allActivity",
    method: "GET",
    params: {
      courseId,
      classId,
    },
  });
};

export const teacherModifySignInStatusAPI = (
  siginId: number,
  studentId: number,
  signinStatus: string
) => {
  return http({
    url: "/activity/sigin",
    method: "POST",
    data: {
      siginId,
      studentId,
      signinStatus,
    },
  });
};

export const teacherChooseAPI = (activityId: number, studentId: number) => {
  return http({
    url: "/activity/chooser",
    method: "PUT",
    params: {
      activityId,
      studentId,
    },
  });
};

export const teacherDeleteActivityAPI = (activityId: number) => {
  return http({
    url: "/activity/activity/" + activityId,
    method: "DELETE",
  });
};

export const studentGetAllActivityAPI = (
  courseId: number,
  studentId: number
) => {
  return http({
    url: "/activity/studentAllActivity",
    method: "GET",
    params: {
      courseId,
      studentId,
    },
  });
};

export const studentGetSignInDetailsAPI = (
  activityId: number,
  studentId: number
) => {
  return http({
    url: "/activity/studentSigin",
    method: "GET",
    params: {
      activityId,
      studentId,
    },
  });
};

export const studentSignInAPI = (
  activityId: number,
  studentId: number,
  type: number,
  answer: string,
  answerImage: string
) => {
  return http({
    url: "/activity/studentSigin",
    method: "PUT",
    data: {
      activityId,
      studentId,
      type,
      answer,
      answerImage,
    },
  });
};

export const studentGetChooseDetailsAPI = (activityId: number) => {
  return http({
    url: "/activity/studentChooser",
    method: "GET",
    params: {
      activityId,
    },
  });
};

export const teacherGetAllImagesAPI = (classId: number, image: FormData) => {
  return http({
    url: "/activity/getFaceImageVos",
    method: "POST",
    params: {
      classId,
    },
    data: {
      image,
    },
  });
};

export const uploadImageAPI = (data:FormData) => {
  return http({
    url: "/activity/getImagePath",
    method: "POST",
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getUrlAPI=()=>{
  return http({
    url:"/activity/getSignature",
    method:"GET"
  })
}

export const getYYUrlAPI=()=>{
  return http({
    url:"/activity/getSignature2",
    method:"GET"
  })
}