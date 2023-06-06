import styles from "./index.module.scss";

const updates = [
  {
    version: "V1.0 (2023/05/05)",
    list: [
      "1.拼团可以展示可以按仅差一人查询",
      "2.定时更新拼团信息，删除过期信息",
      "3.复制拼团信息的链接，以及直接跳转到拼多多小程序",
      "4.查看自己发布的拼团",
    ],
  },
  {
    version: "V1.1 (2023/05/15)",
    list: [
      "1.增加不限商品的多人团",
      "2.优化更新和删除过期商品",
      "3.样式优化，样式bug修复",
      "4.修复苹果手机查看拼单详情不显示的问题",
    ],
  },
  {
    version: "V1.2 (2023/06/06)",
    list: ["1.优化加载首页和福利券页加载列表体验"],
  },
];

const Introduction = () => {
  return (
    <div className={styles.container}>
      {updates.map((update) => {
        return (
          <>
            <div className={styles.version}>{update.version}</div>
            <ul className={styles.list}>
              {update.list.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default Introduction;
