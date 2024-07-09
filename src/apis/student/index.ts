// import http from '@/utils/http'

// // 学生查看我的课程
// export const studentGetCourseAPI=(studentId:string)=>{
//     return http({
//         url:'/student/courses/'+studentId,
//         method:'GET'
//     })
// }

// // 学生查看课程任务点
// export const studentViewAllTaskAPI=(courseId:string)=>{
//     return http({
//         url:'/student/chapters/'+courseId
//     })
// }

// // 学生根据章节id获取任务点
// export const studentGetTaskAPI=(chapterId:string)=>{
//     return http({
//         url:'/student/task_points/'+chapterId
//     })
// }

// // 学生根据状态查看作业
// export const studentViewHomeworkByStatusAPI=(studentId:number,courseId:number,operation:number)=>{
//     return http({
//         url:'/student/assignments',
//         params:{
//             studentId,courseId,operation
//         }
//     })
// }

// // 学生写作业
// export const studentDoHomeworkAPI=(data:{studentId:number,assignmentId:number,state:number,content:string})=>{
//     return http({
//         url:'/student/assignment',
//         method:'PUT',
//         data
//     })
// }

// // 学生获取所有资料
// export const studentGetAllInformationAPI=(courseId:string)=>{
//     return http({
//         url:'/student/resources/'+courseId,
//         method:'GET'
//     })
// }

// // 学生获取学习记录
// export const studentGetAllStudyRecordsAPI=(studentId:number,courseId:number)=>{
//     return http({
//         url:'/student/study-record',
//         method:'GET',
//         params:{
//             studentId,courseId
//         }
//     })
// }

// // 学生查看该课程错题集
// export const studentViewCourseMistakesAPI=(studentId:number,courseId:number)=>{
//     return http({
//         url:'/student/mistakes',
//         method:'GET',
//         params:{
//             studentId,courseId
//         }
//     })
// }

// // 学生查看错题详情
// export const studentViewMistakesDetails=(mistakeId:string)=>{
//     return http({
//         url:'/student/mistake-detail/'+mistakeId,
//         method:'GET'
//     })
// }

