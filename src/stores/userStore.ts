import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/home'

export const useUserStore = defineStore('user', () => {
    const user=ref<User>({
        name:'123',
        avatar:'123',
        id:1,
        account:'666',
        email:'123',
        identity:1,
        roleId:2
    })

    const isLogin=ref(false);

    const getIsLogin=()=>{
        return isLogin.value
    }

    const changeIsLogin=(value:boolean)=>{
        isLogin.value=value
    }

    const setUserInfo=(data:User)=>{
        
        console.log(data);
        
        user.value=data
    }

    const getUserInfo=()=>{
        return user.value
    }

    return {
        user,isLogin,setUserInfo,getUserInfo,getIsLogin,changeIsLogin
    }
},{
    persist:{
        // enabled: true,
        storage:localStorage
    }
})
