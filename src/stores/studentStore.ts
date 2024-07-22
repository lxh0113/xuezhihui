import { ref } from "vue";
import { defineStore } from "pinia";

export const useStudentStore = defineStore(
  "student",
  () => {
    const studentList = ref([
      [
        "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/wisdomHub/22:30:09-9df1ae0797084e08b5b959bd52db3410wlh(1).jpg",
        "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/wisdomHub/22:30:10-b6f99ee9baeb47fa8ffa0cc0c0bc5e87wlh(2).jpg",
      ],
      [
        "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/wisdomHub/22:30:09-348682938d1045abb4c4ea698fce5d9dclass(1).jpg",
      ],
    ]);

    const setStudentList=(value:any)=>{
        studentList.value=value
    }

    const getStudentList=()=>{
        return studentList.value
    }

    return {
        setStudentList,
        getStudentList
    };
  },
  {
    persist: {
      // enabled: true,
      storage: localStorage,
    },
  }
);
