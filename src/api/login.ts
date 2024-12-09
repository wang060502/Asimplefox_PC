import request from '@/utils/request'

// 谷歌登陆
export const getloginGoogle = () => {
  return request.get('/google/login', {
    params: {
      now: false
    }
  })
}

// 获取谷歌登录回调
export const getGoogleCallback = (params:string) => {
  const queryParams = new URLSearchParams(params).toString()
  return request.get(`/google/callback?${queryParams}`)
}

// 普通登陆
export const getLogin = (username:string, pwd:string) => {
  return request.post('/user/login', {
    username, pwd
  })
}

// 获取登陆信息
export const getuserInfo = () => {
  return request.get('/user/info')
}

// 获取邀请码详情
export const getinviteall = () => {
  return request.get('/api/invite/all')
}

// 发起验证码请求
export const getVerificationCode = (email:string) => {
  return request.get('/user/reqvcode', {
    params: {
      email
    }
  })
}

// 检测重名
export const getname = (id:string) => {
  return request.get('/user/check', {params:{
    id
  }})
}
// 账号注册
export const Postregisnlogin = (username:string, password:string, email:string, code:string, icode:string) => {
  return request.post('/user/register', {
    username, password, email, code, icode
  })
}


//头像修改
export const PostAvatar= (formData:FormData)=>{
  return request.post('/user/modify', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

//心跳keepalive
export const Getkeepalive=()=>{
  return request.get('/api/counts/keepalive')
}
