import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  getConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }

    return config
  }

  interceptors (instance) {
    // Add a request interceptor
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      return config
    }, (error) => {
      // Do something with request error
      errorHandle(error)
      return Promise.reject(error)
    })

    // Add a response interceptor
    instance.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (response.status === 200) {
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response)
      }
    }, (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      errorHandle(error)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      url,
      method: 'GET'
    }, config)

    return this.request(options)
  }

  post (url, data) {
    return this.request({
      url,
      method: 'POST',
      data
    })
  }
}

export default HttpRequest
