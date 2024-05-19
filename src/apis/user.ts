import http from '@/utils/http'

export const loginAPI=(data:{account:string;password:string})=>{
    return http({
        url:'/login',
        method:'GET',
        data
    })
}

