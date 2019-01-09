import axios from 'axios'
import {vueProject} from '@/main.js'
const music_api=process.env.VUE_APP_MUSIC_URL
let http=axios.create({
    timeout:15000,
    withCredentials:true,
    baseURL:music_api,
    params:{
        ts:new Date().getTime()
    }
})
http.interceptors.request.use(function(config){
    return config
},function(error){
    return Promise.reject(error)
})
http.interceptors.response.use(res=>{
    if(res.data.code===200){
        return res
    }
    if('success' in res.data){
        return res
    }
    let msg =res.data.msg ?res.data.msg :'数据请求报错'
vueProject.$msg({text:msg,background:'#ff3366'})
return Promise.reject(res)
},error=>{
    return Promise.reject(error)
})
export default http