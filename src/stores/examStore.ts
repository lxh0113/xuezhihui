import { ref } from "vue";
import { defineStore } from "pinia";

export const useExamStore = defineStore(
  "exam",
  () => {
    const examTime = ref(120);

    const setExamTime = (value: number) => {
      examTime.value = value;
    };

    const getExamTime = () => {
      return examTime.value;
    };

    return {
      examTime,
      setExamTime,
      getExamTime,
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
