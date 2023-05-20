import styles from "./styles.module.scss";
import { type OrderData } from "../../../api/types";
import shareIcon from "../../../assets/share.svg";

const Card = ({
  order,
  onClick,
  shareBtn,
}: {
  order: OrderData;
  onClick?: () => void;
  shareBtn?: boolean;
}) => {
  const {
    goodsName,
    hdThumbUrl,
    customerNum,
    activityPrice,
    originPrice,
    groupRemainCount,
  } = order;

  return (
    <div className={styles["card-container"]} onClick={onClick}>
      <div className={styles["img-container"]}>
        <span className={styles["custom-number"]}>{customerNum}人团</span>
        <img className={styles["goods-img"]} src={hdThumbUrl} alt="" />
      </div>
      <div className={styles["order-info"]}>
        <div className={styles["goods-name"]}>{goodsName}</div>
        <div className={styles["price-container"]}>
          <div className={styles["price"]}>
            {activityPrice && (
              <div className={`${styles["goods-price"]} ${styles["current"]}`}>
                <span className={styles.wrapper}>
                  ￥<span className={styles.number}>{activityPrice}</span>
                </span>
                <span className={styles["price-type"]}>拼团价</span>
              </div>
            )}
            {originPrice && (
              <div className={styles["goods-price"]}>
                <span className={styles.wrapper}>
                  ￥<span className={styles.number}>{originPrice}</span>
                </span>
                <span className={styles["price-type"]}>单买价</span>
              </div>
            )}
          </div>
          {shareBtn ? (
            <button
              className="text-blue-600  h-8 bg-white shadow ml-auto mr-0  flex items-center gap-2 text-sm"
              open-type="share"
            >
              <img className="w-4" alt="share-icon" src={shareIcon}></img> 分享
            </button>
          ) : (
            <div className={styles["btn"]}>还差{groupRemainCount}人</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
