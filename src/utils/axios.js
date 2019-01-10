import axios from 'axios'
import { dispatch } from './../store'  

const errorMsgMap = {  //  错误map
  404: '请求地址有误。',
  500: '服务器错误。',
  502: '网关错误。'
}

function requestErrorMsg (desc) {  // 错误处理
  dispatch.app.notify({
    message: '请求错误',
    type: 'error',
    description: desc
  })
}

function errorRes (err) {  // 错误
  if (err.code === 'ECONNABORTED') {
    requestErrorMsg('请求超时')
  }
  if (err.response) {
    requestErrorMsg(errorMsgMap[err.response.status])
  } else {
    requestErrorMsg(err.message)
  }
  throw err
}

function transformReq (request) {  //  请求拦截
  const data = request.params
  request.params = {
    t: Date.now()
  }
  if (request.method === 'get') {
    request.params['data'] = data || {}
  }
  if (request.method === 'post') {
    request.data =
      'data=' + encodeURIComponent(JSON.stringify(request.data || {}))
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return request
}

function successRes ({data}) {   //  response 拦截
  const defaultError = {
    message: '未知错误',
    code: -1
  }
  if (!data) throw defaultError
  if (!data.success) {
    switch (data.code) {
      // 针对错误code
      case 206:
        // 权限码，跳转 登陆页
        window.location.replace(
          `/login?redirect=${encodeURIComponent(window.location.href)}`,
        )
        break
      case 252:
        break
      default:
        break
    }
    const error = {
      message: data.msg,
      code: data.code
    }
    throw error
  }
  return data.data
}

const instance = axios.create({  // axios实例
  baseURL: '/',
  timeout: 60000,
  headers: { Accept: '*/*' },
  withCredentials: true  // 允许跨域请求带凭证
})

instance.interceptors.request.use(transformReq)
instance.interceptors.response.use(successRes, errorRes)

export default instance
