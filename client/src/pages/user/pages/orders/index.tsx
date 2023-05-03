import { useContext, useEffect, useState } from "react";
import { showLoading, hideLoading } from "@tarojs/taro";
import { OrderData } from "../../../../api/types";
import { OpenIdContext } from "../../../../context/index";
import { getMyOrders } from "../../../../api/index";
import { formatDate } from "../../../../utils";
import styles from "./index.module.scss";

const MyOrders = () => {
  const openId = useContext(OpenIdContext);
  const [orders, setOrders] = useState<OrderData[]>([]);
  useEffect(() => {
    if (openId) {
      showLoading();
      getMyOrders(openId)
        .then((res) => {
          if (res.data.data) {
            setOrders(res.data.data);
            console.log(res.data.data);
          }
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    }
  }, [openId]);
  console.log(openId);
  return (
    <>
      {!orders.length ? (
        <div className={styles.noData}>暂无拼单数据</div>
      ) : (
        <div className={styles.orderContainer}>
          {orders.map((order) => (
            <OrderCard key={order.groupOrderId} orderData={order} />
          ))}
        </div>
      )}
    </>
  );
};

const OrderCard = ({ orderData }: { orderData: OrderData }) => {
  const orderState =
    new Date(orderData.expireTime).getTime() > Date.now()
      ? orderData.groupRemainCount > 0
        ? "进行中"
        : "已拼满"
      : "已过期";
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderInfo}>
        <div
          className={
            orderState === "进行中"
              ? `${styles.orderState} ${styles.current}`
              : `${styles.orderState}`
          }
        >
          {orderState}
        </div>
        <div className={styles.expireTime}>
          结束时间: {formatDate(new Date(orderData.expireTime))}
        </div>
      </div>
      <div className={styles.orderDetail}>
        <img src={orderData.hdThumbUrl} className={styles.goodsImage} />
        <div className={styles.goodsInfo}>{orderData.goodsName}</div>
      </div>
    </div>
  );
};

export default MyOrders;
