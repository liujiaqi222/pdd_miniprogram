import avatar from "../../assets/user-avatar.svg";
import shareIcon from "../../assets/share.svg";
import arrowIcon from "../../assets/arrow.svg";
import groupBuyIcon from "../../assets/group-buy.svg";
import infoIcon from "../../assets/info.svg";
import trumpetIcon from "../../assets/trumpet.svg";
import { useUserLogin } from "./hooks/login";
import styles from "./index.module.scss";

const User = () => {
  const { openId } = useUserLogin();
  console.log(openId);
  return (
    <div className={styles.userContainer}>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <img src={avatar} alt="user-avatar" className={styles.avatar} />
          <div className={styles.name}>微信用户</div>
        </div>
        <div className={styles.share}>
          <img
            className={styles.shareIcon}
            alt="share-icon"
            src={shareIcon}
          ></img>
          <div className={styles.shareText}>分享</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <img
            className={styles.icon}
            src={groupBuyIcon}
            alt="group-buy-icon"
          />
          <div className={styles.title}>我的拼团</div>
        </div>
        <img src={arrowIcon} alt="arrow-icon" className={styles.arrowIcon} />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <img className={styles.icon} src={infoIcon} alt="info-icon" />
          <div className={styles.title}>使用教程</div>
        </div>
        <img src={arrowIcon} alt="arrow-icon" className={styles.arrowIcon} />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <img className={styles.icon} src={trumpetIcon} alt="trumpet-icon" />
          <div className={styles.title}>功能介绍</div>
        </div>
        <img src={arrowIcon} alt="arrow-icon" className={styles.arrowIcon} />
      </div>
    </div>
  );
};

export default User;
