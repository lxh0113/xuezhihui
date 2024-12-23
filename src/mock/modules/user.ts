import { Random } from "mockjs"; // 导出随机函数
import type { User } from "@/types/home";

function login(req: any) {
  // req是一个请求对象，包含: url，type和body属性
  // if(req.data)
  console.log(req);
  
  // if (account === "666" && password === "123")
    // return {
    //   code: 200,
    //   data: {
    //     id: 1,
    //     account: "666",
    //     email: Random.email(),
    //     name: Random.cname(),
    //     roleId:2,
    //     identity: 2,
    //     avatar:
    //       "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%284%29.jpg",
    //   },
    //   message: "登录成功",
    // };
  // else {
    return {
      code: 200,
      data: {
        id: 1,
        account: "888",
        email: Random.email(),
        name: Random.cname(),
        identity: 1,
        roleId:2,
        avatar:
          "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%284%29.jpg",
      },
      message: "登录成功",
    };
  // else
  //   return {
  //     code: 401,
  //     data: null,
  //     message: "登录失败",
  //   };
}

function profile(req) {
  return {
    code: 200,
    data: {
      username: Random.cname(),
      age: Random.integer(10, 30),
      date: Random.date(),
      message: "",
    },
  };
}

function logout(req) {
  return {
    code: 200,
    data: {
      message: "Logout successfully.",
    },
  };
}

export default {
  login,
  profile,
  logout,
};
