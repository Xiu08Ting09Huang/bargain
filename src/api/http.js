
import axios from 'axios'

const base_url = 'https://tango.heeyhome.com'
// const base_url = 'http://192.168.137.232:8887'

// const base_url = 'http://47.97.122.243:8887'

// 登录接口
export const userLogin = data => {
  return axios.post(base_url + '/cx/wx/user/login', data)
}
// 商品列表
export const listGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/listGoods', data )
} 
// 商品详情
export const detailGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/getDetailGoods', data )
}
// 我的砍价
export const  myCutGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/myCutGoods', data )
}
// 进行砍价
export const  cutGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/cutGoods', data )
}
// 砍价详情
export const  getDetailCutGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/getDetailCutGoods', data )
}
// 获取ticket

export const  getTicket = data => {
  return axios.post(base_url + '/cx/wx/user/getTicket', data )
}
// 获取签名
export const  getConfig = data => {
  return axios.post(base_url + '/cx/wx/user/signAlgorithm', data )
}
// 核销码列表
export const  myCode = data => {
  return axios.post(base_url + '/cx/wx/bargain/myCode', data )
}
// 砍价成功生成核销码
export const  createCode = data => {
  return axios.post(base_url + '/cx/wx/bargain/createCode', data )
}
// 判断用户是否关注
export const  subscribe = data => {
  return axios.post(base_url + '/cx/wx/user/subscribe', data )
}

// 根据砍价id获取二维码
export const  getCode = data => {
  return axios.post(base_url + '/cx/wx/bargain/getCode', data )
}

// home页轮播图
export const  listPicture = data => {
  return axios.post(base_url + '/cx/wx/bargain/listPicture', data )
}