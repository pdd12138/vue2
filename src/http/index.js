import axios from "axios";
import Vue from "vue";
import { Toast } from 'vant'

Vue.use(Toast)
const http=axios.create({
    baseURL:'http://localhost:3000',

})
// 在发送请求之前拦截，request，数据来之前
http.interceptors.request.use(function (config) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      return config
    })
    
    // 在响应数据之后拦截，response，数据来之后
    http.interceptors.response.use(function (config) {
      // 关闭加载提示
      Toast.clear()
      return config
    })
export default http