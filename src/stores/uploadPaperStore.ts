import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/home";

export const useUploadPaperStore = defineStore(
  "uploadPaper",
  () => {
    
    const currentUploadStep=ref(0)

    const uploadResult=ref([
        {
            flag:-1,url:''
        }
    ])

    const setCurrentUploadStep=(currentIndex:number)=>{
        currentUploadStep.value=currentIndex
    }

    const getCurrentUploadStep=()=>{
        return currentUploadStep.value
    }

    const setUploadResultByIndex=(index:number,value:any)=>{
        uploadResult.value[index]=value
    }

    const getUploadResult=()=>{
        return uploadResult.value
    }

    return {
      currentUploadStep,
      uploadResult,
      setCurrentUploadStep,
      getCurrentUploadStep,
      setUploadResultByIndex,
      getUploadResult
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
