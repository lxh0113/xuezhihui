import http from "@/utils/http";

export const teacherGetClassInfoAPI = (classId: number) => {
  return http({
    url: "/class/students/" + classId,
    method: "GET",
  });
};

export const teacherAddStudentAPI = (
  name: string,
  sno: string,
  classId: number,
  faceImage: string
) => {
  return http({
    url: "/class/student",
    method: "POST",
    data: {
      name,
      sno,
      classId,
      faceImage,
    },
  });
};

export const teacherModifyStudentAPI = (
  studentId: number,
  name: string,
  sno: string,
  classId: number,
  faceImage: string
) => {
  return http({
    url: "/class/student/" + studentId,
    method: "PUT",
    data: {
      name,
      sno,
      classId,
      faceImage,
    },
  });
};

export const teacherDeleteStudentAPI = (id: number) => {
  return http({
    url: "/class/student/" + id,
    method: "DELETE",
  });
};

export const teacherAddClassAPI = (name: string, teacherId: number) => {
  return http({
    url: "/class/class",
    method: "POST",
    params: {
      name,
      teacherId,
    },
  });
};

export const teacherGetAllClassAPI = (teacherId: number) => {
  return http({
    url: "/class/class",
    method: "GET",
    params: {
      teacherId,
    },
  });
};

export const teacherDeleteClassAPI = (id: number) => {
  return http({
    url: "/class/class/" + id,
    method: "DELETE",
  });
};

export const teacherModifyClassNameAPI = (name: string, classId: number) => {
  return http({
    url: "/class/class",
    method: "PUT",
    params: {
      name,
      classId,
    },
  });
};

export const teacherGetClassByIdAPI = (classId: number) => {
  return http({
    url: "/class/getClass",
    method: "GET",
    params: {
      classId,
    },
  });
};
