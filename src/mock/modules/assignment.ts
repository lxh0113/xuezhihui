import { Random } from "mockjs"; // 导出随机函数
import type { User } from "@/types/home";

import Mock from "mockjs";

function teacherGetAllClass(req) {
  let data = Mock.mock({
    "data|2-6": [
      {
        "id|+3": 1,
        className: "@ctitle()",
      },
    ],
  });

  return {
    code: 200,
    data: data.data,
    message: "获取成功",
  };
}

function studentViewAllAssignment(req: any) {
  let data = Mock.mock({
    "data|2-6": [
      {
        assignmentId: "@Integer(100,500)",
        endDate: "@Date()",
        title: "@ctitle()",
        state: Random.pick(["已完成", "未完成", "待批阅"]),
      },
    ],
  });

  return {
    code: 200,
    data: data.data,
    message: "获取成功",
  };
}

function studentViewAssignmentDetails(req: any) {
  let myContent = Mock.mock({
    "content|4-9": [
      {
        questionScore: "",
        studentScore: "",
        type: Random.pick(["单选题", "多选题", "填空题", "简答题", "判断题"]),
        title: JSON.stringify({
          text: "@ctitle()",
          options: JSON.stringify(["122", "12333", "444", "666"]),
        }),
        studentAnswer: "@sentence(1)",
        questionComment: "@sentence(2)",
        answer: "@sentence(1)",
        answerAnalysis: "@sentence(3)",
      },
    ],
  });

  return {
    code: 200,
    data: Mock.mock({
      id: "@Integer(100,700)",
      studentId: "@Integer(200,900)",
      assignmentId: "@Integer(600,900)",
      state: Random.pick([0, 1, 2]),
      studentScore: "@Integer(0,100)",
      teacherId: "@Integer(10,900)",
      comment: "@sentence()",
      content: JSON.stringify(myContent.content),
      courseId: "@Integer(90,1000)",
      title: "@ctitle()",
    }),
    message: "获取成功",
  };
}

function studentDoAssignment(req: any) {
  return {
    code: 200,
    data: null,
    message: "获取成功",
  };
}

function teacherAddAssignment(req: any) {
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "获取成功",
  };
}

function teacherPublishAssignment(req: any) {
  return {
    code: 200,
    data: 123,
    message: "获取成功",
  };
}

function teacherDeleteAssignment(req: any) {
  return {
    code: 200,
    data: null,
    message: "获取成功",
  };
}

function teacherModifyAssignmentStatus(req: any) {
  return {
    code: 200,
    data: null,
    message: "获取成功",
  };
}

function teacherMarkAssignment(req: any) {
  return {
    code: 200,
    data: null,
    message: "获取成功",
  };
}

function teacherViewAllAssignment(req: any) {
  let { data } = Mock.mock({
    "data|4-9": [
      {
        assignmentId: "@Integer(100,300)",
        title: "@ctitle()",
        beginDate: "@date()",
        endDate: "@date()",
        state: "@Integer(0,2)",
        "classList|3-9": [
          {
            "id|+9": 1,
            className: "@cname()",
          },
        ],
        waitCorrectNum: "@Integer(1,56)",
        finishedNum: "@Integer(1,56)",
        allNum: "@Integer(30,56)",
        unCommittedNum: "@Integer(1,50)",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function teacherViewAssignmentList(req: any) {
  let { data } = Mock.mock({
    "data|4-9": [
      {
        studentAssignmentId: "@Integer(100,200)",
        name: "@cname()",
        sno: "123344",
        state: "@Integer(0,2)",
        studentScore: "@Integer(0,100)",
        beginDate: "@date()",
        endDate: "@date()",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function teacherViewSingleAssignment(req: any) {
  let { data } = Mock.mock({
    data: {
      name: "@cname()",
      className: "@cname()",
      title:"@ctitle()",
      studentScore:"@Integer(0,100)",
      "questionList|3-8": [
        {
          questionScore: 5,
          studentScore: "@Integer(0,5)",
          type: Random.pick(["单选题", "多选题", "填空题", "简答题", "判断题"]),
          title: JSON.stringify({
            text: "@ctitle()",
            options: JSON.stringify(["122", "12333", "444", "666"]),
          }),
          studentAnswer: "@sentence(2)",
          questionComment: "@sentence(2)",
          answer: "",
          answerAnalysis: "@sentence(2)",
        },
      ],
    },
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

export default {
  teacherGetAllClass,
  studentViewAllAssignment,
  studentViewAssignmentDetails,
  studentDoAssignment,
  teacherAddAssignment,
  teacherPublishAssignment,
  teacherDeleteAssignment,
  teacherModifyAssignmentStatus,
  teacherMarkAssignment,
  teacherViewAllAssignment,
  teacherViewAssignmentList,
  teacherViewSingleAssignment,
};
