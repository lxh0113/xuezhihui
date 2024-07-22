import { ref } from "vue";
import { defineStore } from "pinia";

export const useAnswerStore = defineStore(
  "answer",
  () => {

    const answerList=ref({
        answerList:[
            {
                "answer": "在操作系统中，进程是程序的一次执行实例。它包括程序的代码、数据以及程序运行时所需的资源（如内存、CPU时间片等）。"
            },
            {
                "answer": "进程控制块是操作系统维护的一个数据结构，用于存储一个进程的重要信息。"
            },
            {
                "answer": "进程映像指的是操作系统在内存中存放的一个进程的完整状态，包括程序的代码、数据、堆栈、打开的文件、当前的寄存器状态等。"
            }
        ],
        answerUrl:''
    })

    const setAnswerData=(value:any)=>{
        answerList.value=value
    }

    const getAnswerData=()=>{
        return answerList.value
    }
    
    return {
      answerList,
      setAnswerData,
      getAnswerData
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
