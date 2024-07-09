import http from "@/utils/http";

export const studentGetAllResourceAPI = (courseId: number) => {
  return http({
    url: "/resource/" + courseId,
    method: "GET",
  });
};
