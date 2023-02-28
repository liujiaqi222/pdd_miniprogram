import { request, addInterceptor, interceptors, RequestTask } from "@tarojs/taro";




addInterceptor(interceptors.timeoutInterceptor)


export type OrderData = {
  goodsName: string, // 商品名称
  goodsId: number,
  hdThumbUrl: string, // 商品图片
  goodsImg: string,
  activityPrice: string, // 活动价格
  originPrice: string, // 原价
  linkUrl: string, // 商品链接
  groupSize: string,
  groupStatus: number, // 0: 拼团中, 1: 拼团成功
  customerNum: string, // 几人团
  expireTime: Date,
  groupUserList: { avatar: string }[], //拼单的用户头像
  groupRemainCount: number, // 还差几个人成团
  groupOrderId: number
}


export type OrderParams = { searchKey?: string, listType?: 'shortOne' | 'newGroup' }

export function getOrders(query?: { searchKey?: string, listType?: 'shortOne' | 'newGroup' }, currentPage?: number): RequestTask<OrderData[]> {
  return request({
    url: `http://localhost:4000/api/v1/orders/`,
    method: "GET",
    data: {
      goodsName: query?.searchKey || '',
      currentPage: currentPage || 0,
      listType: query?.listType
    }
  })

}
