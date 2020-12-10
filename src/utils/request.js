import HttpRequest from './axios'
import config from '@/config'

const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod

const request = new HttpRequest(baseURL)

export default request
