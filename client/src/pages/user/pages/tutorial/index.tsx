import styles from "./index.module.scss";

const Tutorial = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tip}>
        <div className={styles.question}>小程序介绍</div>
        <div className={styles.answer}>
          拼多多百亿补贴部分商品需要多人拼团才能完成，本小程序旨在共享拼团信息，更快成团。
        </div>
      </div>
      <div className={styles.tip}>
        <div className={styles.question}>如何开团</div>
        <div className={styles.answer}>
          首先需要到拼多多你的拼团订单详情页，点击邀请好友，然后在弹窗中点“分享图片”，拼团图片即可保存到手机。回到小程序，点击小程序底部的“发布”按钮，上传带有拼单信息的二维码图片。
        </div>
      </div>
      <div className={styles.tip}>
        <div className={styles.question}>使用贴士</div>
        <div className={styles.answer}>
          <p>
            1.开团前请先在小程序内搜索已发布团，如果有可以直接拼，无需再发布，增加效率。
          </p>
          <p>2.如果没有搜索到想要的商品,可以自己发布团点击发布信息。</p>
          <p>3.如果发布的时候上传链接错误，可在上传页面有拼团教程.</p>
          <p>
            4.此小程序仅为提供拼团活动，下单支付等流程为跳转拼多多官方小程序完成，请放心使用。
          </p>
        </div>
      </div>
      <div className={styles.tip}>
        <div className={styles.question}>意见反馈</div>
        <div className={styles.answer}>
          使用过程中，如果遇到程序功能问题，或者想要分享建议，可以联系微信hahazfb
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
