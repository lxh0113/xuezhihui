<template>
  <div class="backBox">
    <!-- <div class="title">学情分析</div> -->
    <div class="chart">
      <div class="firstChart"></div>
      <div class="secondChart"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, getCurrentInstance, ref } from "vue";
// import { generateExamAnalysisClass } from "../../../mock/teacher/examAnalysis.js";
import { ElMessage } from "element-plus";
// import { getMaxMinAveAPI, teacherGetAllClassDetailsAPI } from "@/apis/exam.js";
import { useUserStore } from "@/stores/userStore";

const chartData1 = ref({
  title: {
    text: "软件1-7班多次考试平均分分布",
  },
  legend: {},
  dataZoom: [
    {
      type: "slider",
      throttle: "50",
      minValueSpan: 6,
      start: 1,
      end: 50,
      zoomLock: false,
    },
  ],
  color: [
    "#63b2ee",
    "#76da91",
    "#f8cb7f",
    "#f89588",
    "#7cd6cf",
    "#9192ab",
    "#7898e1",
    "#efa666",
    "#eddd86",
    "#9987ce",
    "#63b2ee",
    "#76da91",
  ],
  tooltip: {
    trigger: "axis", // 设置触发类型为坐标轴触发，即鼠标移动到坐标轴上时触发提示
    axisPointer: {
      type: "cross", // 坐标轴指示器类型，可以是 line（直线指示器）、shadow（阴影指示器）、cross（十字准星指示器）、none（无指示器）
    },
  },
  xAxis: {
    data: ["软件1班", "软件2班", "软件3班", "软件4班", "软件5班", "软件6班", "软件7班"],
  },
  yAxis: {},
  series: [
    {
      name: "第一次考试",
      type: "line", // 将柱状图改为折线图
      data: [85, 78, 92, 68, 77, 83, 88], // 这里是第一次考试的平均分数据
    },
    {
      name: "第二次考试",
      type: "line", // 将柱状图改为折线图
      data: [80, 82, 88, 72, 79, 85, 90], // 这里是第二次考试的平均分数据
    },
    {
      name: "第三次考试",
      type: "line", // 将柱状图改为折线图
      data: [78, 80, 85, 70, 75, 82, 87], // 这里是第三次考试的平均分数据
    },
  ],
});

const chartData2 = ref({
  title: {
    text: "各班级历史平均分成绩分布",
  },
  legend: {
    data: ["一班", "二班", "三班", "四班", "五班", "六班", "七班"],
  },
  dataZoom: [
    {
      type: "slider",
      throttle: 50,
      minValueSpan: 6,
      start: 1,
      end: 50,
      zoomLock: false,
    },
  ],
  color: [
    "#63b2ee",
    "#76da91",
    "#f8cb7f",
    "#f89588",
    "#7cd6cf",
    "#9192ab",
    "#7898e1",
    "#efa666",
    "#eddd86",
    "#9987ce",
    "#63b2ee",
    "#76da91",
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    data: ["一班", "二班", "三班", "四班", "五班", "六班", "七班"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "一班",
      type: "bar",
      data: [85, 78, 92,85,67,90,56], // 填充一班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    {
      name: "二班",
      type: "bar",
      data: [77, 80, 85,69,83,56,88], // 填充二班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    {
      name: "三班",
      type: "bar",
      data: [90, 82, 88,82,76,56,67], // 填充三班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    // 继续添加其余班级的数据
    {
      name: "四班",
      type: "bar",
      data: [81, 79, 86,87,82,90,78], // 填充四班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    {
      name: "五班",
      type: "bar",
      data: [83, 76, 89,78,67,54,90], // 填充五班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    {
      name: "六班",
      type: "bar",
      data: [79, 81, 87,77,70,85,65], // 填充六班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    {
      name: "七班",
      type: "bar",
      data: [87, 84, 91,76,87,45,91], // 填充七班的历史平均分数据
      label: {
        show: true,
        position: "top",
        textStyle: {
          fontSize: 14,
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


const classScoreList = ref([]);
const userStore = useUserStore();
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

const setChart = () => {
  const dom1 = document.querySelector(".firstChart");
  const myChart1 = echarts.init(dom1);
  const dom2 = document.querySelector(".secondChart");
  const myChart2 = echarts.init(dom2);
  // 指定图表的配置项和数据
  var option1 = chartData1.value;
  var option2 = chartData2.value;

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);
  myChart2.setOption(option2);
  window.addEventListener("resize", () => {
    myChart1.resize();
    myChart2.resize();
  });

  onUnmounted(() => {
    myChart1.dispose();
    myChart2.dispose();
  });
};

//   const setChartData1=async()=>{
//     const res=await teacherGetAllClassDetailsAPI(userStore.getUserInfo().account);

//     if(res.data.code===200)
//     {
//       console.log(res.data.data)

//       chartData1.value.xAxis.data=res.data.data?.map(item=>{
//         return item.title
//       })

//       chartData1.value.series=res.data?.data[0]?.classScoreList?.map(item=>{
//         return {
//           name: item.name,
//           type: 'line',
//           data: [],
//           label: {
//           show: false,
//           position: 'top',
//           textStyle: {
//             fontSize: 14
//           }
//           },
//           emphasis:{
//             label:{
//               show:true
//             }
//           }
//         }
//       })

//       for(let i=0;i<chartData1.value.series?.length;i++)
//       {
//         chartData1.value.series[i].data=res.data.data.map(item=>{
//           return item.classScoreList[i]?.avgScore||0
//         })
//       }

//       // initChart()
//       setChart()

//     }
//     else {
//       ElMessage.error(res.data.message)
//     }
//   }

//   const setChartData2=async()=>{
//     const res=await teacherGetAllClassDetailsAPI(userStore.getUserInfo().account);

//     if(res.data.code===200)
//     {
//       console.log(res.data.data)

//       chartData2.value.xAxis.data=res.data?.data?.map(item=>{
//         return item.title
//       })

//       chartData2.value.series=res.data?.data[0]?.classScoreList?.map(item=>{
//         return {
//           name: item.name,
//           type: 'bar',
//           data: [],
//           label: {
//           show: true,
//           position: 'top',
//           textStyle: {
//             fontSize: 14
//           }
//           },
//           emphasis:{
//             label:{
//               show:true
//             }
//           }
//         }
//       })

//       for(let i=0;i<chartData2.value.series?.length;i++)
//       {
//         chartData2.value.series[i].data=res.data.data.map(item=>{
//           return item.classScoreList[i]?.avgScore||0
//         })
//       }

//       // initChart()
//       setChart()

//     }
//     else {
//       ElMessage.error(res.data.message)
//     }
//   }

//   const initChart=()=>{
//     setChartData1()
//     setChartData2()
//   }

onMounted(() => {
  setChart();
  // initChart()
});
</script>

<style lang="scss" scoped>
.backBox {
  background: white;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 120px);
  // margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .title {
    font-size: 20px;
    line-height: 50px;
    padding-left: 20px;
    color: #3a63f3;
    background-color: white;
  }

  .chart {
    display: flex;
    width: 100%;
    flex-direction: column;
    // background-color: antiquewhite;
    height: 100%;
    // flex-wrap: wrap;

    .firstChart,
    .secondChart {
      flex: 1;
      background-color: #fff;
      min-width: 400px;
      margin-right: 10px;
      margin-bottom: 10px;
      min-height: 420px;
      box-sizing: border-box;
      padding: 20px;

      transition: all 0.5s;
    }
  }
}
</style>
