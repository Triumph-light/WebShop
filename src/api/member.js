import request from '@/utils/request.js'
/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const findOrderList = ({ orderState, page, pageSize }) => {
  return request('/member/order', 'get', { orderState, page, pageSize })
}

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const delteOrder = ids => {
  return request('/member/order', 'delete', { ids })
}

/**
 * 查看物理
 * @param {String} id - 订单ID
 * @returns
 */
export const logisticsOrder = id => {
  return request(`/member/order/${id}/logistics`, 'get')
}

/**
 * 查看物理
 * @param {String} id - 订单ID
 * @returns
 */
export const findOrder = id => {
  return request(`/member/order/${id}`, 'get')
}

// export const confirmOrder = id => {
//   return request('member/order/consignment/', 'delete', { ids })
// }
