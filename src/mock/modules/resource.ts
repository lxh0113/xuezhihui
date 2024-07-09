import { Random } from "mockjs"; // 导出随机函数
import Mock from "mockjs";

function studentGetAllResource(req: any) {
  let { data } = Mock.mock({
    "data|3-8": [
      {
        "id|+2": 1,
        courseId: "@Integer(20,100)",
        content: "@sentence()",
        createTime: "@time()",
        creatorId: "@Integer(2000,700000)",
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

export default {
  studentGetAllResource,
};
