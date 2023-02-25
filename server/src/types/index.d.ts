export type PddData = {
  store: {
    goodsInfo: {
      goodsId: number,
      hdThumbUrl: string,
      goodsName: string,
      linkUrl: string,
      activityPrice: string,
      originPrice: string,
      brandName: string, // 品牌名称
    },
    groupInfo: {
      customerNum: string, // 几人团
      expireTime: string,
      groupStatus: 0 | 1, // 0: 拼团中, 1: 拼团成功
      groupUserList:
      {
        avatar: string,
      }[],
      groupOrderId: string,
      groupRemainCount: number, // 还差几个人成团
    }
  },
}