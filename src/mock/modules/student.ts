import { Random } from "mockjs"; // 导出随机函数
import type { User } from "@/types/home";

import Mock from "mockjs";

function getUrlSearch(name: string, href: string) {
  // 未传参，返回空
  if (!name) return null;
  // 查询参数：先通过search取值，如果取不到就通过hash来取
  var after = window.location.search;
  after = after.substr(1) || href.split("?")[1];
  // 地址栏URL没有查询参数，返回空
  if (!after) return null;
  // 如果查询参数中没有"name"，返回空
  if (after.indexOf(name) === -1) return null;

  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // 当地址栏参数存在中文时，需要解码，不然会乱码
  var r = decodeURI(after).match(reg);
  // 如果url中"name"没有值，返回空
  if (!r) return null;

  return r[2];
}

function studentViewMyCourse(req: any) {
  // req是一个请求对象，包含: url，type和body属性

  console.log(req);
  // alert(req)
  const urlLists = req.url.split("/");
  const studentId = urlLists[urlLists.length - 1];
  console.log(studentId);

  let data = Mock.mock({
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

function studentViewCourseTask(req: any) {
  let data = Mock.mock({
    "chapterVOList|1-7": [
      {
        "id|+1": 3,
        chapterTitle: "@ctitle(2,6)",
        chapterNumber: "@integer()",
        done: "@boolean()",
        "chapterVOList|1-7": [
          {
            "id|+1": 100,
            chapterTitle: "@ctitle(3,6)",
            chapterNumber: "@integer()",
            done: "@boolean()",

            "chapterVOList|1-7": [
              {
                "id|+1": 500,
                chapterTitle: "@ctitle(6)",
                chapterNumber: "@integer()",
                chapterVOList: null,
                done: "@boolean()",
              },
            ],
          },
        ],
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function studentViewSingleTask(req) {
  let data = Mock.mock({
    "id|+1": 3,
    taskPointTitle: "@ctitle(3,7)",
    type: Random.pick(["video", "ppt", "text"]),
    tpNumber: "@integer()",
    content: Random.paragraph(),
    chapterId: "@integer()",
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function studentViewAllHomework(req: any) {
  console.log(req);

  let op = getUrlSearch("operation", req.url);

  let operation = parseInt(op as string);

  let { data } = Mock.mock({
    "data|1-7": [
      {
        "id|+3": 4,
        endDate: Random.datetime(),
        title: "@ctitle()",
        state: Random.pick(["已完成", "未完成", "待批阅"]),
      },
    ],
  });

  // if (operation === 1) {
  //   // 将所有项目的状态设置为 "已完成"
  //   data.forEach((item) => {
  //     item.state = "已完成";
  //   });
  // } else if (operation === 2) {
  //   // 将所有项目的状态设置为 "未完成"
  //   data.forEach((item) => {
  //     item.state = "未完成";
  //   });
  // }

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function studentGetAllInformation(req: any) {
  let { data } = Mock.mock({
    "data|1-7": [
      {
        "id|+3": 4,
        courseId: "@integer()",
        content: "@ctitle()",
        createTime: "@datetime()",
        creatorId: "@integer()",
        creatorName: "@cname()",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

function studentGetStudyRecords(req: any) {
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

function studentGetMistakes(req: any) {
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

function studentViewSingleMistakes(req: any) {
  let  data  = Mock.mock({
    type:Random.pick(["单选题", "多选题", "判断题", "简答题", "判断题"]),
    title: Random.sentence(2),
    answer:Random.word(),
    answerAnalysis:Random.sentence(3),
    studentAnswer:Random.word(),
    courseName:'@ctitle()'
  });

  return {
    code: 200,
    data,
    message: "获取成功",
  };
}

export default {
  studentViewMyCourse,
  studentViewCourseTask,
  studentViewSingleTask,
  studentViewAllHomework,
  studentGetAllInformation,
  studentGetStudyRecords,
  studentGetMistakes,
  studentViewSingleMistakes
};
