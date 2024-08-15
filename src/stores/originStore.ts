import { ref } from "vue";
import { defineStore } from "pinia";

export const useOriginStore = defineStore(
  "origin",
  () => {
    const originPaperData = ref({
      questions: [
        {
          questionScore: 8,
          title: JSON.stringify({
            text: "解释一下术语：进程、进程控制块、进程映像、线程、进程互斥和同步、临界区和临界资源、竞争条件、原语、信号量、管程、死锁、饥饿",
          }),
          type: "简答题",
        },
      ],

      files: [],
      type: 0,
    });

    const setOriginPaperData = (myData: any) => {
      // alert(1)
      console.log(myData);
      originPaperData.value = myData;
    };

    const getOriginPaperData = () => {
      console.log(originPaperData.value);
      return originPaperData.value;
    };

    return {
      originPaperData,
      setOriginPaperData,
      getOriginPaperData,
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
