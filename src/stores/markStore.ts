import { ref } from "vue";
import { defineStore } from "pinia";

export const useMarkStore = defineStore(
    "mark",
    () => {
        const markList = ref([{
            beginDate: '',
            endDate: '',
            name: '',
            sno: '',
            state: 1,
            studentAssignmentId: 1,
            studentScore: 0
        }])

        const activeIndex = ref(0)

        const setActiveIndex = (i: number) => {
            activeIndex.value = i;
        }

        const getActiveIndex = () => {
            return activeIndex.value
        }

        const setMarkList = (value: any[]) => {
            markList.value = value
        }

        const getMarkList = () => {
            return markList.value
        }


        return {
            markList,
            activeIndex,
            setMarkList,
            getMarkList,
            setActiveIndex,
            getActiveIndex
        }
  },
    {
        persist: {
            // enabled: true,
            storage: localStorage,
        },
    }
);
