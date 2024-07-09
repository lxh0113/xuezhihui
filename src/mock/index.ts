/**
 * 定义本地测试接口，最好与正式接口一致，尽可能减少联调阶段修改的工作量
 */
// 引入mockjs
import Mock from "mockjs";
// 引入模板函数类

// 用户模块
import user from "./modules/user";

// 学生模块
import student from "./modules/student";

// // 教师模块
import teacher from "./modules/teacher";

// 作业模块
import assignment from "./modules/assignment";

// 题目模块
import question from "./modules/question";

// 课程模块
import course from "./modules/course";

// 资源
import resource from "./modules/resource";

// 活动模块
import activity from "./modules/activity";

const { mock } = Mock; // Mock函数

// 使用拦截规则拦截命中的请求
// mock( url, post/get, 返回的数据/函数（有return值）);
mock(RegExp("/mock/user/login" + ".*"), "get", user.login);

// 学生模块
// mock(RegExp("/mock/student/courses"+ ".*"),"get",student.studentViewMyCourse)
// mock(RegExp("/mock/student/chapters"+ ".*"),"get",student.studentViewCourseTask)
// mock(RegExp("/mock/student/task_points"+ ".*"),"get",student.studentViewSingleTask)
// mock(RegExp("/mock/student/assignments"+ ".*"),"get",student.studentViewAllHomework)
// mock(RegExp("/student/resources"+ ".*"),"get",student.studentGetAllInformation)
// mock(RegExp("/student/study-record"+ ".*"),"get",student.studentGetStudyRecords)
// mock(RegExp("/student/mistakes"+ ".*"),"get",student.studentGetMistakes)
// mock(RegExp("/student/mistake-detail"+ ".*"),"get",student.studentViewSingleMistakes)

// 老师模块
// mock(RegExp("/teacher/courses"+ ".*"),"get",teacher.teacherViewCourse)
// mock(RegExp("/teacher/questions"),"put",teacher.teacherAddQuestion)
// mock(RegExp("/teacher/question"),"put",teacher.teacherModifyQuestion)
// mock(RegExp("/teacher/question"+ ".*"),"delete",teacher.teacherDeleteQuestion)
// mock(RegExp("/teacher/course"),"put",teacher.teacherCreateCourse)
// mock(RegExp("/teacher/course"+".*"),"delete",teacher.teacherDeleteCourse)
// mock(RegExp("/teacher/questions-all"+".*"),"get",teacher.teacherGetCourseQuestions)

// 作业模块
mock(RegExp("/mock/assignment/class/"), "get", assignment.teacherGetAllClass);

mock(RegExp("/mock/assignment"), "put", assignment.studentDoAssignment);

mock(
  RegExp("/mock/assignment/teacher"),
  "put",
  assignment.teacherAddAssignment
);
mock(
  RegExp("/mock/assignment/publish"),
  "put",
  assignment.teacherPublishAssignment
);
mock(
  RegExp("/mock/assignment/" + ".*"),
  "delete",
  assignment.teacherDeleteAssignment
);
mock(
  RegExp("/mock/assignment/state" + ".*"),
  "put",
  assignment.teacherModifyAssignmentStatus
);
mock(
  RegExp("/mock/assignment/correct"),
  "put",
  assignment.teacherMarkAssignment
);

mock(
  RegExp("/mock/assignment/teacher" + ".*"),
  "get",
  assignment.teacherViewAllAssignment
);
mock(
  RegExp("/mock/assignment/Submission_list" + ".*"),
  "get",
  assignment.teacherViewAssignmentList
);
mock(
  RegExp("/mock/assignment/student/" + ".*"),
  "get",
  assignment.teacherViewSingleAssignment
);

mock(
  RegExp("/mock/assignment/" + ".*"),
  "get",
  assignment.studentViewAssignmentDetails
);
mock(
  RegExp("/mock/assignment" + ".*"),
  "get",
  assignment.studentViewAllAssignment
);

// 课程模块
mock(RegExp("/mock/course/courses/" + ".*"), "get", course.studentViewMyCourse);

mock(RegExp("/mock/course"), "put", course.teacherCreateCourse);
mock(RegExp("/mock/course/" + ".*"), "delete", course.teacherDeleteCourse);
mock(RegExp("/mock/course/chapters/" + ".*"), "get", course.getAllChapters);
mock(RegExp("/mock/course/chapter/" + ".*"), "get", course.teacherViewChapter);
mock(RegExp("/mock/course/chapter"), "put", course.teacherAddChapter);
mock(RegExp("/mock/course/chapter/update"), "put", course.teacherModifyChapter);
mock(
  RegExp("/mock/course/chapter/" + ".*"),
  "delete",
  course.teacherDeleteChapter
);
mock(
  RegExp("/mock/course/study-record" + ".*"),
  "get",
  course.studentViewRecords
);

mock(RegExp("/mock/course/" + ".*"), "get", course.teacherViewMyTeachCourse);

// 问题模块
mock(
  RegExp("/mock/question/all/" + ".*"),
  "get",
  question.teacherViewCourseQuestion
);
mock(RegExp("/mock/question"), "put", question.teacherAddSingleQuestion);
mock(RegExp("/mock/question/list"), "put", question.teacherAddQuestion);
mock(RegExp("/mock/question/mix-up"), "put", question.teacherModifyQuestion);
mock(
  RegExp("/mock/question/" + ".*"),
  "delete",
  question.teacherDeleteQuestion
);
mock(
  RegExp("/mock/question/" + ".*"),
  "get",
  question.teacherViewQuestionDetails
);
mock(
  RegExp("/mock/question/mistakes" + ".*"),
  "get",
  question.studentViewCourseQuestion
);
mock(
  RegExp("/mock/question/mistakes-all"),
  "get",
  question.studentViewAllCourseQuestion
);
mock(
  RegExp("/mock/question/mistake-detail/" + ".*"),
  "get",
  question.studentViewQuestionDetail
);

// 资源模块get
mock(RegExp("/mock/resource/"), "get", resource.studentGetAllResource);

// 活动模块
mock(RegExp("/mock/activity/addSigin"), "put", activity.teacherCreateSignIn);
mock(
  RegExp("/mock/activity/addChooser" + ".*"),
  "put",
  activity.teacherCreateChoosePeople
);

mock(
  RegExp("/mock/activity/allActivity" + ".*"),
  "get",
  activity.teacherGetAllActivity
);

mock(
  RegExp("/mock/activity/sigin"),
  "post",
  activity.teacherModifySignInStatus
);
mock(
  RegExp("/mock/activity/chooser" + ".*"),
  "put",
  activity.teacherChoosePeople
);
mock(
  RegExp("/mock/activity/activity/" + ".*"),
  "delete",
  activity.teacherDeleteActivity
);
mock(
  RegExp("/mock/activity/studentSigin" + ".*"),
  "get",
  activity.studentGetSignInDetails
);
mock(RegExp("/mock/activity/studentSigin"), "put", activity.studentSignIn);
mock(
  RegExp("/mock/activity/studentChooser"),
  "get",
  activity.studentGetChoosePeopleDetails
);
mock(
  RegExp("/mock/activity/getFaceImageVos" + ".*"),
  "get",
  activity.teacherGetAllImage
);
mock(RegExp("/mock/activity/getImagePath"), "get", activity.uploadImage);

mock(
  RegExp("/mock/activity/studentAllActivity" + ".*"),
  "get",
  activity.studentGetAllActivity
);

mock(
  RegExp("/mock/activity/" + ".*"),
  "get",
  activity.teacherViewActivityDetails
);
