import styles from "./styles.module.scss";
import { type OrderData } from "../../../api/types";
import shareIcon from "../../../assets/share.svg";

const Card = ({
  order,
  onClick,
  shareBtn,
  isOnReview,
}: {
  order: OrderData;
  onClick?: () => void;
  shareBtn?: boolean;
  isOnReview: boolean;
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
        <div className="ellipsis-line-2">{goodsName}</div>
        <div className={styles["price-container"]}>
          {activityPrice && originPrice && !isOnReview && (
            <div className="flex gap-2 items-end">
              <span className="text-xl leading-5 text-primary font-bold">
                ￥{activityPrice}
              </span>
              <span className="line-through text-gray-500">
                ￥{originPrice}
              </span>
            </div>
          )}
          {shareBtn ? (
            <button
              className="text-green h-8 bg-white shadow ml-auto mr-0  flex items-center gap-2 text-sm font-bold"
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
