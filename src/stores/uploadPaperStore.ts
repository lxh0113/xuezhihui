import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/home";

export const useUploadPaperStore = defineStore(
  "uploadPaper",
  () => {

    const paperId=ref(1)

    const setPaperId=(id:number)=>{
      paperId.value=id
    }

    const getPaperId=()=>{
      return paperId.value
    }
    
    const currentUploadStep=ref(0)

    const uploadResult=ref<number[]>([])

    const setCurrentUploadStep=(currentIndex:number)=>{
        currentUploadStep.value=currentIndex
    }

    const getCurrentUploadStep=()=>{
        return currentUploadStep.value
    }

    const setUploadResultByIndex=(index:number,value:number)=>{
        uploadResult.value[index]=value

        currentUploadStep.value=Math.max(currentUploadStep.value,index)
    }

    const getUploadResult=()=>{
        return uploadResult.value
    }

    const clear=()=>{
      currentUploadStep.value=0;
      uploadResult.value=[]
    }

    return {
      paperId,
      setPaperId,
      getPaperId,
      currentUploadStep,
      uploadResult,
      setCurrentUploadStep,
      getCurrentUploadStep,
      setUploadResultByIndex,
      getUploadResult,
      clear
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
