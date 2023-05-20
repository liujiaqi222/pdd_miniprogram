import styles from "./index.module.scss";

const Introduction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.version}>V1.0 (2023/05/05)</div>
      <ul className={styles.list}>
        <li>1.拼团可以展示可以按仅差一人查询</li>
        <li>2.定时更新拼团信息，删除过期信息</li>
        <li>3.复制拼团信息的链接，以及直接跳转到拼多多小程序</li>
        <li>4.查看自己发布的拼团</li>
      </ul>
      <div className={styles.version}>V1.1 (2023/05/15)</div>
      <ul className={styles.list}>
        <li>1.增加不限商品的多人团</li>
        <li>2.优化更新和删除过期商品</li>
        <li>3.样式优化，样式bug修复</li>
        <li>4.修复苹果手机查看拼单详情不显示的问题</li>
      </ul>
      <div className={styles.version}>V1.2 (2023/05/20)</div>
      <ul className={styles.list}>
        <li>1.发布商品后自动跳回到首页，并刷新页面</li>
        <li>2.搜索的样式和体验优化</li>
        <li>3.增加拼多多福利券页面</li>
      </ul>
    </div>
  );
};

export default Introduction;
