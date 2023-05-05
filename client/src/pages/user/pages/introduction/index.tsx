import styles from "./index.module.scss";

const Introduction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.version}>V1.0 (2023/05/05)</div>
      <ul>
        <li>1.拼团可以展示可以按仅差一人查询</li>
        <li>2.定时更新拼团信息，删除过期信息</li>
        <li>3.复制拼团信息的链接，以及直接跳转到拼多多小程序</li>
        <li>4.查看自己发布的拼团</li>
      </ul>
    </div>
  );
};

export default Introduction;
