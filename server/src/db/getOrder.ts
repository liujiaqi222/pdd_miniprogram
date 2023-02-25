import { PddData } from '../types/';
import { Order } from '../models/order';
export const getOrderData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "accept-encoding": "gzip, deflate, br",
      cookie:
        "api_uid=CkpE9GPw91k+cQBzPqFwAg==; webp=1; _nano_fp=XpE8n5mqn5XYnqEolT_zZyli1w~EbFG_GZeynInA; dilx=nfpTMmPhxjCNVQGksDHz5; jrpl=bUhUtApnXVy0OjJQy4gG9Qki1liUXBPv; njrpl=bUhUtApnXVy0OjJQy4gG9Qki1liUXBPv; PDDAccessToken=RVZS7KETW7LSFFOBSJQKQVNG67P64J27CN4ZWJACGSPANMD3OKQQ1118851; pdd_user_id=1250169224; pdd_user_uin=Q3TFJCOWZHDZZOXFDJXBG2BC7Q_GEXDA; pdd_vds=gadlxnwblbmmNOEttlynNltwxLssbyNOmOEwnwLGLsELbInsNwllwlGGlbGw; rec_list_brand_amazing_price_group=rec_list_brand_amazing_price_group_94Hfph",
    },
  });
  const data = await response.text()
  const matchedResult = data.match((/(?<=window.rawData=).+(?=;<\/script>)/))
  if (!matchedResult || !matchedResult[0].length) return {
    success: false,
    message: '没有匹配到数据'
  }

  const pddData: PddData = JSON.parse(matchedResult[0])
  return saveOrderData(pddData)
};


async function saveOrderData(pddData: PddData) {
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
    message: '保存成功'
  }
  return {
    success: false,
    message: '保存失败'
  }
}



