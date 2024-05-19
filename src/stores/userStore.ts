import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/home'

export const useUserStore = defineStore('user', () => {
    const user=ref<User>()

    const setUserInfo=(data:User)=>{
        
        console.log(data);
        
        user.value=data
    }

    const getUserInfo=()=>{
        return user.value
    }

    return {
        setUserInfo,getUserInfo
    }
},{
    persist:true
})
