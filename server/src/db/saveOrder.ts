import { PddData } from '../types/index.js';
import { Order } from '../models/order.js';



export const saveOrderData = async (pddData: PddData['store'])=> {
  const { goodsInfo, groupInfo, endTimeMs } = pddData || {}
  const { goodsId, hdThumbUrl, goodsName, linkUrl, activityPrice, originPrice, brandName } = goodsInfo || {}
  const { customerNum, groupStatus, groupUserList, groupOrderId, groupRemainCount } = groupInfo || {}
  const res = await Order.create({
    goodsId, hdThumbUrl, goodsName, linkUrl, activityPrice, originPrice, brandName,
    customerNum, expireTime: endTimeMs, groupStatus, groupUserList, groupOrderId, groupRemainCount
  }).catch(err => {
    console.log(err)
  })
  if (res) return {
    success: true,
    message: '上传成功',
  }
  return {
    success: false,
    message: '该拼单已经存在'
  }
}




