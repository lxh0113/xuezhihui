import { Random } from "mockjs"; // 导出随机函数
import Mock from "mockjs";

function teacherViewCourseQuestion(req: any) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+90": 13,
        type: Random.pick(["单选题", "多选题", "判断题", "简答题", "填空题"]),
        title: JSON.stringify({
          text: Random.paragraph(3),
          "options|3-4": [Random.sentence(5)],
        }),
        answer: "",
        answerAnalysis: "@sentence()",
        courseId: "@Integer(100,200)",
        courseName: "@cname()",
        creatorId: "@Integer(1,1000)",
        creatorName: "@cname()",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherAddSingleQuestion(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherAddQuestion(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherModifyQuestion(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteQuestion(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherViewQuestionDetails(req: any) {
  let { data } = Mock.mock({
    data: {
      "id|+90": 13,
      type:'单选题',
      // type: Random.pick(["单选题", "多选题", "判断题", "简答题", "填空题"]),
      title: JSON.stringify({
        text: Random.paragraph(3),
        options: JSON.stringify(["11", "22", "33"]),
      }),
      answer: "",
      answerAnalysis: "@sentence()",
      courseId: "@Integer(100,200)",
      courseName: "@cname()",
      creatorId: "@Integer(1,1000)",
      creatorName: "@cname()",
    },
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function studentViewCourseQuestion(req: any) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        questionId: "@integer(100,1000)",
        courseName: "@ctitle()",
        type: Random.pick(["单选题", "多选题", "判断题", "简答题", "判断题"]),
        title: Random.paragraph(2),
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function studentViewAllCourseQuestion(req: any) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        questionId: "@integer(100,1000)",
        courseName: "@ctitle()",
        type: Random.pick(["单选题", "多选题", "判断题", "简答题", "判断题"]),
        title: Random.paragraph(2),
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function studentViewQuestionDetail(req: any) {
  let data = Mock.mock({
    type: Random.pick(["单选题", "多选题", "判断题", "简答题", "判断题"]),
    title: Random.sentence(2),
    answer: Random.word(),
    answerAnalysis: Random.sentence(3),
    studentAnswer: Random.word(),
    courseName: "@ctitle()",
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}
export default {
  teacherViewCourseQuestion,
  teacherAddQuestion,
  teacherAddSingleQuestion,
  teacherModifyQuestion,
  teacherDeleteQuestion,
  teacherViewQuestionDetails,
  studentViewCourseQuestion,
  studentViewAllCourseQuestion,
  studentViewQuestionDetail,
};
