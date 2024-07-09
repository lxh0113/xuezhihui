import http from '@/utils/http'

export const loginAPI=(account:string,password:string)=>{
    return http({
        url:'/user/login',
        method:'GET',
        params:{
            account,password
        }
    })
}

