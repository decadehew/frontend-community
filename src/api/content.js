import request from '@/utils/request'
import qs from 'qs'

/**
 * 讀取文章列表接口
 * @param {Object} option
 */
const getList = (option) => {
  return request.get('/public/list?' + qs.stringify(option))
}

// 溫馨提醒
const getTips = () => {
  return request.get('/public/tips')
}

// 本週熱議
const getTopWeek = () => {
  return request.get('/public/topWeek')
}

// 友情連接
const getLinks = () => {
  return request.get('/public/links')
}

export { getList, getTips, getTopWeek, getLinks }
