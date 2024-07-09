import { Random } from "mockjs"; // 导出随机函数
import Mock from "mockjs";

function teacherCreateSignIn(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)

  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+2": 1,
        activityId: "@Integer(100,200)",
        studentId: "@Integer(200,300)",
        signinTime: "@time()",
        studentName: "@cname()",
        signinStatus: "",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "登录失败",
  };
}

function teacherCreateChoosePeople(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)

  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+2": 1,
        name: "@cname()",
        schoolId: "@Integer(100,200)",
        sno: "",
        classId: "@Integer(300,400)",
        className: "@cname()",
        faceImage: "",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "登录失败",
  };
}

function teacherViewActivityDetails(req) {
  let { data } = Mock.mock({
    data: {
      ActivityType: "@Integer(0,1)",
      type: "@Integer(0,3)",
      "studentSigninList|20-30": [
        {
          "id|+3": 1,
          activityId: "@Integer(100,200)",
          studentId: "@Integer(200,300)",
          signinTime: "@time()",
          studentName: "@cname()",
          signinStatus: "已签",
        },
      ],
      answerImage:
        "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg",
      detectionImage:
        "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg",
      "students|20-30": [
        {
          "id|+1": 10,
          name: "@cname()",
          schoolId: "@Integer()",
          sno: "@Integer(100,200)",
          classId: "@Integer(100,200)",
          className: "@cname()",
          faceImage:
            "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg",
        },
      ],
    },
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherGetAllActivity(req) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+3": "@Integer()",
        activityType: "@Integer(0,1)",
        title: "@ctitle()",
        beginTime: "@time()",
        endTime: "@time()",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherModifySignInStatus(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherChoosePeople(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function teacherDeleteActivity(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function studentGetAllActivity(req: any) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        "id|+3": 1,
        activityType: "@Integer(0,1)",
        title: "@ctitle(3,6)",
        beginTime: "@time()",
        endTime: "@time()",
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function studentGetSignInDetails(req) {
  let { data } = Mock.mock({
    data: {
      type: "@Integer(0,3)",
      // type:2,
      signInStatus: null,
      signinTime: "@time()",
      beginTime: "@time()",
      endTime: "@time()",
      timeState: "@Integer(0,1)",
    },
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function studentSignIn(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

function studentGetChoosePeopleDetails(req) {
  let { data } = Mock.mock({
    "data|3-7": [
      {
        type: "@Integer(0,1)",
        "studentSigninList|20-30": [
          {
            "id|+3": 1,
            activityId: "@Integer(100,200)",
            studentId: "@Integer(200,300)",
            signinTime: "@time()",
            studentName: "@cname()",
            signinStatus: "",
          },
        ],
        answerImage: "",
        detectionImage: "",
        "students|20-30": [
          {
            "id|+1": 10,
            name: "@cname()",
            schoolId: "@Integer()",
            sno: "",
            classId: "@Integer(100,200)",
            className: "@cname()",
            faceImage: "",
          },
        ],
      },
    ],
  });

  return {
    code: 200,
    data,
    message: "",
  };
}

function teacherGetAllImage(req) {
  return {
    code: 200,
    data: Mock.mock({
      path: "",
      id: "@Integer()",
      name: "@cname()",
    }),
    message: "",
  };
}

function uploadImage(req) {
  return {
    code: 200,
    data: null,
    message: "",
  };
}

export default {
  teacherCreateSignIn,
  teacherChoosePeople,
  teacherViewActivityDetails,
  teacherGetAllActivity,
  teacherModifySignInStatus,
  teacherCreateChoosePeople,
  teacherDeleteActivity,
  studentGetAllActivity,
  studentGetSignInDetails,
  studentSignIn,
  studentGetChoosePeopleDetails,
  teacherGetAllImage,
  uploadImage,
};
