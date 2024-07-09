import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useClassStore = defineStore('class', () => {
    
    const currentClass=ref(1)

    const getCurrentClass=()=>{
        return currentClass.value
    }

    const setCurrentClass=(value:number)=>{
        currentClass.value=value
    }

    return {
        getCurrentClass,setCurrentClass
    }
},{
    persist:{
        // enabled: true,
        storage:localStorage
    }
})
