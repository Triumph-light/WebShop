import request from '@/utils/request.js'

/**
 * 获取再次购买的订单结算信息
 * @param {String} id - 订单ID
 * @returns
 */
export const findOrderRepurchase = id => {
  return request(`/member/order/repurchase/${id}`, 'get')
}

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const addAddress = address => {
  return request('/member/address', 'post', address)
}

/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const editAddress = address => {
  return request('/member/address', 'put', address)
}

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrder = order => {
  return request('/member/order', 'post', order)
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = id => {
  return request('/member/order/' + id, 'get')
}
