export type PddData = {
  store: {
    goodsInfo: {
      goodsId: number;
      hdThumbUrl: string;
      goodsName: string;
      linkUrl: string;
      activityPrice: string;
      originPrice: string;
      brandName: string; // 品牌名称
    };
    groupInfo: {
      customerNum: string; // 几人团
      expireTime: string;
      groupStatus: 0 | 1; // 0: 拼团中, 1: 拼团成功 2:拼团失败可能是用户取消了拼单
      groupUserList: {
        avatar: string;
      }[];
      groupOrderId: string;
      groupRemainCount: number; // 还差几个人成团
      groupOrderType: 0 | 1; // 0: 普通拼团, 1: 任意一件均可成团
      subjectGroupTitle: string; // eg:任买1件 均可一起参与拼单
      subjectGroupTitleDetail: string; // eg:美妆大牌3人团 专属再补最高\u003Cem\u003E2582元\u003C\u002Fem\u003E
      subjectGroupGoodsText: string; // eg:共23件商品可选
      subjectGroupGoodsList: {
        goodsName: string;
        hdThumbUrl: string;
        linkUrl: string;
      }[];
    };
    endTimeMs: number; // 拼团结束时间
  };
};

type ReverseShortUrlSuccessResult = {
  success: true,
  longUrl: string,
  headers: http.IncomingHttpHeaders
}
type ReverseShortUrlErrorResult = {
  success: false,
  headers?: http.IncomingHttpHeaders
  error: string | Error,
}

export type ReverseResult = Promise<ReverseShortUrlErrorResult | ReverseShortUrlSuccessResult>