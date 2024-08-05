// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import router from '@/router/index.js'
// import { useUserStore } from "@/stores/userStore.ts";
import { useRoute,useRouter } from 'vue-router';


import { showLoading, hideLoading } from '@/utils/loading.js'
const http = axios.create({
    baseURL: 'http://192.168.50.199:8079',
    // baseURL:'/mock',
    timeout: 6000*1000
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

// 拦截器

// axios请求拦截器


http.interceptors.request.use(config => {
    console.log(config.url)
    let WhiteList = ['/python/getContent']
    let reqUrl=config.url //可以直接获取到当前请求的url地址
   // WhiteList.includes(reqUrl)
    
    if(WhiteList.includes(reqUrl)){
      
    }else {
        showLoading()
    }
    
    return config
}, e => Promise.reject(e))


// axios响应式拦截器
http.interceptors.response.use((response=>{

    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
    setTimeout(() => {
        hideLoading()
    }, 200)

    // const userStore=useUserStore()
    const router=useRouter()

    const status=response.status
    switch (status){
       case 400 :
            ElMessage({type:'warning',message:response.data.message})
            break
        case 401 :
            router.push('/login')
            break
        case 402 :
            router.push('/login')
            break
    }

    return response

}), e => {
    setTimeout(() => {
        hideLoading()
    }, 200)
    return Promise.reject(e)
})



export default http
