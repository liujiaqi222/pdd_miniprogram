import { PddData } from '../types/index.js';
import { Order } from '../models/order.js';
export const getOrderData = async (orderId: string) => {
  const url = process.env.PDD_URL + orderId
  const response = await fetch(url, {
    headers: {
      "accept-encoding": "gzip, deflate, br",
      cookie:
        process.env.COOKIE!,
    },
  });
  const data = await response.text()
  const matchedResult = data.match((/(?<=window.rawData=).+(?=;<\/script>)/))
  if (!matchedResult || !matchedResult[0].length) return {
    success: false,
    message: '没有匹配到数据'
  }

  const pddData: PddData = JSON.parse(matchedResult[0])
  return saveOrderData(pddData, url)
};


async function saveOrderData(pddData: PddData, url: string) {
  const { goodsInfo, groupInfo } = pddData.store || {}
  const { goodsId, hdThumbUrl, goodsName, linkUrl, activityPrice, originPrice, brandName } = goodsInfo || {}
  const { customerNum, expireTime, groupStatus, groupUserList, groupOrderId, groupRemainCount } = groupInfo || {}
  const res = await Order.create({
    goodsId, hdThumbUrl, goodsName, linkUrl, activityPrice, originPrice, brandName,
    customerNum, expireTime, groupStatus, groupUserList, groupOrderId, groupRemainCount
  }).catch(err => {
    console.log(err)
  })
  if (res) return {
    success: true,
    message: '上传成功',
    url
  }
  return {
    success: false,
    message: '该拼单已经存在'
  }
}



