import { Random } from "mockjs"; // 导出随机函数
import Mock from "mockjs";

function studentViewMyCourse(req: any) {
  let { data } = Mock.mock({
    "data|1-7": [
      {
        "id|+1": 1,
        courseName: "@ctitle(5)",
        createTime: Random.date(),
        userId: Random.id(),
        image:
          "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function teacherViewMyTeachCourse(req) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+1": 1,
        courseName: "@ctitle()",
        createTime: "@datetime()",
        userId: "@integer(10000,90000)",
        image:
         "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherCreateCourse(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteCourse(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function getAllChapters(req) {
  let {data} = Mock.mock({
    "data|10-30":[
      {
        id:"@Integer(1,10)",
        chapterTitle:"@ctitle()",
        chapterNumber:"",
        level:"@Integer(1,3)",
        fatherId:"@Integer(1,10)",
        courseId:"@Integer(2,10)",
        taskPointTitle:"",
        content:'@Sentence()'
      }
    ]
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function teacherViewChapter(req) {
  return {
    code: 200,
    data: {
      message: "Logout successfully.",
    },
  };
}

function teacherAddChapter(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherModifyChapter(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteChapter(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function studentViewRecords(req) {
  let data = Mock.mock({
    allTaskPointNum: "@integer(20,100)",
    finishTaskPointNum: "@integer(1,20)",
    classRank: "@integer(1,40)",
    allAssignmentNum: "@integer(1,10)",
    finishAssignmentNum: "@integer(1,5)",
    avgAssignmentScore: "@integer(1,100)",
    allExamNum: "@integer(1,12)",
    avgExamScore: "@integer(60,100)",
    "examHistoryVoList|3-8": [
      {
        "id|+10": 13,
        examTitle: "@ctitle()",
        studentScore: "@integer(60,100)",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

export default {
  studentViewMyCourse,
  teacherViewMyTeachCourse,
  teacherCreateCourse,
  teacherDeleteCourse,
  getAllChapters,
  teacherViewChapter,
  teacherAddChapter,
  teacherModifyChapter,
  teacherDeleteChapter,
  studentViewRecords,
};
