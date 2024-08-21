import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useNameStore = defineStore(
  "name",
  () => {
    
    const name=ref('文旅航')

    const setName=(value:string)=>{
        name.value=value
    }

    const getName=()=>{
        return name.value
    }

    return {
        name,
        setName,
        getName
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
