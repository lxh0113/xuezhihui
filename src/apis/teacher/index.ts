// import http from "@/utils/http";

// // 教师添加题目
// export const teacherAddQuestionsAPI = (data: {
//   id: number;
//   type: string;
//   title: string;
//   answer: string;
//   answerAnalysis: string;
//   courseId: number;
//   creatorId: number;
//   creatorName: string;
// }) => {
//   return http({
//     url: "/teacher/questions",
//     method: "PUT",
//     data,
//   });
// };

// // 教师删除题目

// export const teacherDeleteQuestionsAPI = (questionId: string) => {
//   return http({
//     url: "/teacher/questions/" + questionId,
//     method: "DELETE",
//   });
// };

// // 教师题目详情

// export const teacherGetQuestionsDetailsAPI = (questionId: string) => {
//   return http({
//     url: "/teacher/question/" + questionId,
//     method: "GET",
//   });
// };

// export const teacherViewCourseQuestionAPI=(courseId:string)=>{
//   return http({
//     url:'/teacher/questions-all'+courseId,
//     method:'GET'
//   })
// }

// // 教师查看我教的课

// export const teacherGetMyTeachCourseAPI = (teacherId: string) => {
//   return http({
//     url: "/teacher/courses/" + teacherId,
//     method: "GET",
//   });
// };

// // 教师创建课程

// export const teacherCreateCourseAPI = (data: {
//   id: number;
//   courseName: string;
//   createTime: string;
//   userId: number;
//   image: string;
// }) => {
//   return http({
//     url: "/teacher/course",
//     method: "PUT",
//     data,
//   });
// };

// // 教师删除课程

// export const teacherDeleteCourseAPI = (courseId: string) => {
//   return http({
//     url: "/teacher/course/" + courseId,
//     method: "DELETE",
//   });
// };

// // 教师查看章节详情

// export const teacherViewChapterAPI = (courseId: string) => {
//   return http({
//     url: "/teacher/chapters/" + courseId,
//   });
// };

// // 教师修改章节

// export const teacherModifyChaptersAPI = (data: {}) => {
//   return http({
//     url: "/teacher/chapters",
//     method: "PUT",
//   });
// };

// // 教师删除章节

// export const teacherDeleteChaptersAPI = (chapterId: string) => {
//   return http({
//     url: "/teacher/chapter/" + chapterId,
//     method: "DELETE",
//   });
// };

// // 教师添加作业

// export const teacherAddHomeworkAPI = (data: {
//   beginDate: string;
//   content: string;
//   courseId: number;
//   courseName: string;
//   endDate: string;
//   id: number;
//   score: number;
//   state: number;
//   title: string;
// }) => {
//   return http({
//     url: "/teacher/assignment",
//     method: "PUT",
//     data,
//   });
// };

// // 教师删除作业

// export const teacherDeleteHomeworkAPI = (assignmentId: string) => {
//   return http({
//     url: "/teacher/assignment/" + assignmentId,
//     method: "DELETE",
//   });
// };

// // 教师修改作业状态

// export const teacherModifyHomeworkStatusAPI = (
//   assignmentId: number,
//   state: number
// ) => {
//   return http({
//     url: "/teacher/assignment/state",
//     method: "PUT",
//     params: {
//       assignmentId,
//       state,
//     },
//   });
// };

// // 教师批改作业

// export const teacherModifyHomeworkAPI=(data:{
//     assignmentId: number;
//     comment:string;
//     content:string;
//     courseId: number;
//     id: number;
//     state: number;
//     studentId: number;
//     studentScore: number;
//     teacherId: number;
// })=>{
//     return http({
//         url:'/teacher/assignment/correct',
//         method:'PUT',
//         data
//     })
// }
