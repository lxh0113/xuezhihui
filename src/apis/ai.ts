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

export const voiceChatAPI=(question:string)=>{
    return http({
        url:'/python/voiceChat',
        method:'POST',
        data:{
            question
        }
    })
}