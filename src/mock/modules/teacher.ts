import { Random } from "mockjs"; // 导出随机函数
import type { User } from "@/types/home";
import Mock from "mockjs";

function teacherViewCourse(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+1": 1,
        courseName: "@ctitle()",
        createTime: "@datetime()",
        userId: "@integer(10000,90000)",
        image:
          "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpghttps://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherGetCourseQuestions(req: any) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+90": 13,
        type: Random.pick(["单选题", "多选题", "判断题", "简答题", "填空题"]),
        title: JSON.stringify({
          text: Random.paragraph(3),
          "options|3-4": [Random.sentence(5)],
        }),
      },
    ],
  });

  return {
    code:200,
    data,
    message:''
  }
}

function teacherAddQuestion(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherModifyQuestion(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteQuestion(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherCreateCourse(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteCourse(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherGetAllChapters(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherGetSingleChapter(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)

  let data = Mock.mock({
    "id|+101": 7,
    chapterTitle: "@ctitle()",
    chapterNumber: "@integer(10,1000)",
    level: Random.pick([1, 2, 3]),
    fatherId: "@integer(10,300)",
    courseId: "@integer(600,10000)",
    "taskPointList|1-4": [
      {
        "id|+118": 2,
        taskPointTitle: "@ctitle()",
        type: Random.pick(["video", "text", "ppt"]),
        tpNumber: "@integer(200,800)",
        content: Random.paragraph(10),
        chapterId: "@integer(300,1000)",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherAddChapter(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)

  // let data=Mock.mock({
  //   "id|+101":7,
  //   chapterTitle:'@ctitle()',
  //   chapterNumber:"@integer(10,1000)",
  //   level:Random.pick([1,2,3]),
  //   fatherId:'@integer(10,300)',
  //   courseId:'@integer(600,10000)',
  //   "taskPointList|1-4":[
  //     {
  //       "id|+118":2,
  //       taskPointTitle:'@ctitle()',
  //       type:Random.pick(['video','text','ppt']),
  //       tpNumber:'@integer(200,800)',
  //       content:Random.paragraph(10),
  //       chapterId:'@integer(300,1000)'
  //     }
  //   ]
  // })

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherModifyChapter(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)

  // let data=Mock.mock({
  //   "id|+101":7,
  //   chapterTitle:'@ctitle()',
  //   chapterNumber:"@integer(10,1000)",
  //   level:Random.pick([1,2,3]),
  //   fatherId:'@integer(10,300)',
  //   courseId:'@integer(600,10000)',
  //   "taskPointList|1-4":[
  //     {
  //       "id|+118":2,
  //       taskPointTitle:'@ctitle()',
  //       type:Random.pick(['video','text','ppt']),
  //       tpNumber:'@integer(200,800)',
  //       content:Random.paragraph(10),
  //       chapterId:'@integer(300,1000)'
  //     }
  //   ]
  // })

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteChapter(req: any) {
  // req是一个请求对象，包含: url，type和body属性

  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherAddHomework(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteHomework(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherModifyHomeworkStatus(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherMarkHomework(req: any) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

export default {
  teacherViewCourse,
  teacherAddQuestion,
  teacherModifyQuestion,
  teacherDeleteQuestion,
  teacherCreateCourse,
  teacherDeleteCourse,
  teacherGetSingleChapter,
  teacherAddChapter,
  teacherModifyChapter,
  teacherDeleteChapter,
  teacherAddHomework,
  teacherDeleteHomework,
  teacherModifyHomeworkStatus,
  teacherMarkHomework,
  teacherGetCourseQuestions,
  
};
