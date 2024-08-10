import { ref } from "vue";
import { defineStore } from "pinia";

export const usePaperStore = defineStore(
  "paper",
  () => {
    const paperTitle=ref('test')

    const setPaperTitle=(title:string)=>{
        paperTitle.value=title
    }

    const getPaperTitle=()=>{
        return paperTitle.value
    }

    return {
      setPaperTitle,
      getPaperTitle
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
