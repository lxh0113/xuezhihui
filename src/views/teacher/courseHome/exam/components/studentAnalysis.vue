<template>
  <div class="analysisBox">
    <div class="top">
      <span>学情分析</span>
    </div>
    <div class="details">
      <div class="chart1"></div>
      <div class="chart2"></div>

      <div class="chart3"></div>
      <div class="chart4"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, getCurrentInstance, ref } from "vue";
// import {
//   studentGetHistoryExamAPI,
//   studentGetScoreStageAPI,
// } from "@/apis/exam.js";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

const chartData1 = ref({
  title: {
    text: "文旅航" + "成绩历次分布",
  },
  legend: {},
  color: ["#748eed", "#91cc75", "#fac858"],
  tooltip: {},
  xAxis: {
    data: [
      "第一次月考",
      "第二次月考",
      "第三次月考",
      "第四次月考",
      "第五次月考",
      "第六次月考",
    ],
  },
  yAxis: {},
  series: [
    {
      name: "文旅航",
      type: "line",
      data: [85, 92, 78, 89, 94, 87],
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      itemStyle: {
        normal: {
          lineStyle: {
            width: 6, //设置线条粗细
          },
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
  ],
});

const chartData2 = ref({
  title: {
    text: "文旅航" + "成绩评定状况",
  },
  legend: {
    orient: "vertical", //图例的布局，水平布局、垂直布局
    type: "scroll", //是否添加滚动页码
    right: 15,
    top: "middle",
    icon: "circle",
    itemWidth: 8, //图例宽度
    itemHeight: 8, //图例高度
    textStyle: {
      //图例字体样式
      color: "#000",
      fontSize: 14,
      fontFamily: "微软雅黑",
    },
  },
  color: [
    "#748eed",
    "#91cc75",
    "#fac858",
    "#ee6666",
    "#73c0de",
    "#9a60b4",
    "#3ba272",
  ],
  tooltip: {},
  grid: {
    top: "60px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    containLabel: true,
  },
  series: [
    {
      type: "pie",
      data: [
        { value: 40, name: "优秀" }, // 例如，40%的成绩被评为优秀
        { value: 30, name: "良好" }, // 30%的成绩被评为良好
        { value: 20, name: "合格" }, // 20%的成绩被评为合格
        { value: 10, name: "待提高" }, // 10%的成绩被评为待提高
      ],
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{b} : ({d}%)", //显示格式
          },
          labelLine: { show: true },
        },
      },
      // roseType: 'area'
    },
  ],
});

const chartData3 = ref({
  title: {
    text: "文旅航" + "班级排名趋势",
  },
  legend: {},
  color: ["#91cc75"],
  tooltip: {},
  xAxis: {
    data: [
      "第一次月考",
      "第二次月考",
      "第三次月考",
      "第四次月考",
      "第五次月考",
      "第六次月考",
    ],
    axisLine: {
      onZero: false,
    },
  },
  yAxis: { inverse: true },
  series: [
    {
      name: "班级排名",
      type: "line",
      data: [4,3,7,8,2,1],
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      itemStyle: {
        normal: {
          color: "#91cc75",
          lineStyle: {
            width: 6, //设置线条粗细
          },
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
  ],
});

const chartData4 = ref({
  title: {
    text: "文旅航" + "年级排名趋势",
  },
  legend: {},
  color: ["#ee6666"],
  tooltip: {},
  xAxis: {
    data: [
      "第一次月考",
      "第二次月考",
      "第三次月考",
      "第四次月考",
      "第五次月考",
      "第六次月考",
    ],
    axisLine: {
      onZero: false,
    },
  },
  yAxis: { inverse: true },
  series: [
    {
      name: "年级排名",
      type: "line",
      data: [12, 8, 15, 7, 5, 10],
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      itemStyle: {
        normal: {
          color: "#ee6666",
          lineStyle: {
            width: 6, //设置线条粗细
          },
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
  ],
});

const setChart = () => {
  const dom1 = document.querySelector(".chart1");
  const myChart1 = echarts.init(dom1);

  const dom2 = document.querySelector(".chart2");
  const myChart2 = echarts.init(dom2);

  const dom3 = document.querySelector(".chart3");
  const myChart3 = echarts.init(dom3);

  const dom4 = document.querySelector(".chart4");
  const myChart4 = echarts.init(dom4);

  // 指定图表的配置项和数据
  var option1 = chartData1.value;

  var option2 = chartData2.value;

  var option3 = chartData3.value;

  var option4 = chartData4.value;

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);
  myChart2.setOption(option2);
  myChart3.setOption(option3);
  myChart4.setOption(option4);

  window.addEventListener("resize", () => {
    // alert(1)
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
  });

  onUnmounted(() => {
    myChart1.dispose();
    myChart2.dispose();
    myChart3.dispose();
    myChart4.dispose();
  });
};

// const initChart = async () => {
//   let res = await studentGetHistoryExamAPI(userStore.getUserInfo().account);

//   if (res.data.code === 200) {
//     console.log(res.data.data);

//     chartData1.value.xAxis.data = res.data.data.map((item) => {
//       return item.examName;
//     });

//     chartData1.value.series[0].data = res.data.data.map((item) => {
//       return item.score;
//     });
//   } else {
//     ElMessage.error(res.data.message);
//   }

//   res = await studentGetScoreStageAPI(userStore.getUserInfo().account);

//   if (res.data.code === 200) {
//     console.log(res.data.data);

//     chartData2.value.series[0].data = res.data.data.map((item) => {
//       return {
//         value: item.value,
//         name: item.name,
//       };
//     });
//   } else {
//     ElMessage.error(res.data.message);
//   }

//   res = await studentGetHistoryExamAPI(userStore.getUserInfo().account);

//   if (res.data.code === 200) {
//     chartData3.value.xAxis.data = res.data.data.map((item) => {
//       return item.examName;
//     });

//     chartData3.value.series[0].data = res.data.data.map((item) => {
//       return item.classRank;
//     });

//     chartData4.value.xAxis.data = res.data.data.map((item) => {
//       return item.examName;
//     });

//     chartData4.value.series[0].data = res.data.data.map((item) => {
//       return item.gradeRank;
//     });
//   } else ElMessage.error(res.data.message);

//   setChart();
// };

onMounted(() => {
  setChart();
  //   initChart();
});
</script>

<style lang="scss" scoped>
.analysisBox {
  background: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 240px);
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .top {
    border-bottom: 1px solid #c4c4c4;

    span {
      display: block;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 20px;
      color: $primary-color;
    }
  }

  .details {
    width: 100%;
    margin-top: 20px;
    display: grid;
    display: grid;
    box-sizing: border-box;
    padding: 20px;
    grid-template-columns: repeat(2, minmax(400px, 75vw));
    gap: 20px;

    .chart1,
    .chart2,
    .chart3,
    .chart4 {
      height: 400px;
      // background-color: aqua;
      // margin-right: 10px;
      // margin-bottom: 10px;
    }
  }
}
</style>
