export type OrderData = {
  goodsName: string; // 商品名称
  goodsId: number;
  hdThumbUrl: string; // 商品图片
  goodsImg: string;
  activityPrice: string; // 活动价格
  originPrice: string; // 原价
  marketPrice:string// 行情价
  linkUrl: string; // 商品链接
  groupSize: string;
  groupStatus: number; // 0: 拼团中, 1: 拼团成功
  customerNum: string; // 几人团
  expireTime: string;
  groupUserList: { avatar: string }[]; //拼单的用户头像
  groupRemainCount: number; // 还差几个人成团
  groupOrderId: string;
};

export type OrderParams = {
  searchKey?: string;
  listType?: "shortOne" | "newGroup";
};

export type CouponData = {
  category_name: string;
  goods_name: string;
  goods_desc: string;
  goods_id:number
  goods_thumbnail_url: string;
  goods_image_url: string; // 商品主图
  goods_sign: string; // https://jinbao.pinduoduo.com/qa-system?questionId=252
  coupon_discount: number; // 单位分
  min_group_price: number; // 单位分
  min_normal_price: number; // 单位分
  sales_tip: string; // 销售量
};

export type PromotionUrlResponse = {
  mobile_url: string;
  we_app_info: {
    page_path: string;
    app_id: string;
  };
  url: string;
  we_app_web_view_url: string;
};
