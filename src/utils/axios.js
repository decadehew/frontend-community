import axios from 'axios'
import errorHandle from './errorHandle'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
    // pending: 存儲了使用者請求歷史紀錄
    this.pending = {}
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

  removePendeng (key, isRequired = false) {
    // true: 對應url已經發起請求，取消上一次請求，執行 cancel method
    if (this.pending[key] && isRequired) {
      this.pending[key]('取消重覆請求')
    }
    delete this.pending[key]
  }

  interceptors (instance) {
    // Add a request interceptor
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      const key = config.url + '&' + config.method
      this.removePendeng(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
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
      const key = response.config.url + '&' + response.config.method
      this.removePendeng(key)

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
