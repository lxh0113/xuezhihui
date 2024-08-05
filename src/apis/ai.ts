import http from '@/utils/http'
import axios from 'axios'

export const getContentAPI=(question:string)=>{
    return http({
        url:'/python/getContent',
        method:'POST',
        data:{
            question
        }
    })
}

