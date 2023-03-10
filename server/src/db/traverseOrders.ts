import type { Types } from 'mongoose'
import { Order } from '../models/order.js';
import { getOrderData } from '../util/index.js';

// 1. 遍历拼团信息, 如果拼团时间已经过期, 则删除该拼团信息
// 2. 对余下的拼团信息重新发起请求, 获取最新的拼团信息，如果人已经满了, 则删除该拼团信息


export const traverseDeleteOrders = async () => {
  // 删除过期的拼单或者拼单信息不完整的拼单
  await Order.deleteMany({ expireTime: { $lt: Date.now() } })
  await Order.deleteMany({ $or: [{ goodsName: '' }, { goodsName: null }, { customerNum: '' }, { customerNum: null }, { hdThumbUrl: null }] })
}

export const traverseOrders = async () => {
  const orders = await Order.find({})
  for (const order of orders) {
    const { groupOrderId, _id } = order
    getOrderData(groupOrderId!).then(res => {
      if (!res) {
        return deleteOrder(_id)
      }
      const { groupStatus, groupRemainCount } = res.groupInfo
      if (groupStatus === 1 || groupRemainCount === 0) {
        return deleteOrder(_id)
      }
      order.groupRemainCount = groupRemainCount
      order.save().catch(err => {
        console.log(err)
      })
    })

  }
}


const deleteOrder = (id: Types.ObjectId) => {
  Order.findByIdAndDelete(id).catch(err => {
    console.log(err)
  })
}



