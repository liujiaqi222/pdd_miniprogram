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
    marketPrice,
    groupRemainCount,
  } = order;
  const profit =
    Math.floor(Number(marketPrice || 0) - Number(activityPrice || 0)) || 0;
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
            {marketPrice && activityPrice ? (
              <div className={styles["goods-price"]}>
                <span className={styles.wrapper}>
                  ￥<span className={styles.number}>{marketPrice}</span>
                </span>
                <span className={styles["price-type"]}>行情价</span>
              </div>
            ) : (
              ""
            )}
            {profit >= 0 && activityPrice && !shareBtn && (
              <div className="bg-red text-white px-2 py-1 rounded-2xl">
                利润: {profit}+
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
            <div className={styles["btn"]}>差{groupRemainCount}人</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
