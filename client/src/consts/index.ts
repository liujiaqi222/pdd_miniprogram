export const PDD_URL = 'https://mobile.yangkeduo.com/pincard_ask.html?__rp_name=brand_amazing_price_group&_pdd_tc=ffffff&_pdd_sbs=1&group_order_id='
export const PDD_APPID = 'wx32540bd863b27570' // 拼多多小程序appid
export const getPddMiniProgramURL = (groupId: string) => {
  return `pages/web/web?share_time=${Date.now()}&share_form=custom_card&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fpincard_ask.html%3F__rp_name%3Dbrand_amazing_price_group%26_pdd_tc%3Dffffff%26_pdd_sbs%3D1%26group_order_id%3D${groupId}%26refer_share_channel%3Dgroup_qrcode&xcx_x_zyw=&from_share=1&refer_share_channel=message&x_scene=1036&refer_share_btn=top_forward&refer_share_source=native&specialUrl=1&refer_share_page=web&card_v=v8.2.3.1&_wv=1`
}




