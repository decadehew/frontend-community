import request from '@/utils/request'

const getCode = (sid) => {
  return request.get('/public/getCaptcha', {
    params: {
      sid
    }
  })
}

const forget = (option) => {
  return request.post('/auth/forget', {
    ...option
  })
}

const loginApi = (loginInfo) => {
  return request.post('/auth/login', {
    ...loginInfo
  })
}

const registerApi = (registerInfo) => {
  return request.post('/auth/register', {
    ...registerInfo
  })
}

export { getCode, forget, loginApi, registerApi }
