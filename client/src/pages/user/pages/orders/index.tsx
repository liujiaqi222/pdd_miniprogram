import { useContext, useEffect, useState } from "react";
import { showLoading, hideLoading, navigateTo } from "@tarojs/taro";
import { OrderData } from "../../../../api/types";
import { OpenIdContext } from "../../../../context/index";
import { getMyOrders } from "../../../../api/index";
import { formatDate } from "../../../../utils";
import styles from "./index.module.scss";

const MyOrders = () => {
  const openId = useContext(OpenIdContext);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [orderState, setOrderState] = useState<{
    state: "outdated" | "" | "fulfilled";
    visible: boolean;
  }>({
    state: "",
    visible: false,
  });
  useEffect(() => {
    if (openId) {
      showLoading();
      getMyOrders(openId)
        .then((res) => {
          hideLoading();
          if (res.data.data) {
            setOrders(res.data.data);
          }
        })
        .catch(() => {
          hideLoading();
        });
    }
  }, [openId]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderState(() => ({ state: "", visible: false }));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [orderState.visible]);
  const handleCardClick = (order: OrderData) => {
    const state =
      new Date(order.expireTime).getTime() > Date.now()
        ? order.groupRemainCount > 0
          ? ""
          : "fulfilled"
        : "outdated";

    setOrderState({ state, visible: true });
    if (state) return;

    navigateTo({
      url: `/pages/index/detail/index?groupOrderId=${order.groupOrderId}`,
    });
  };
  return (
    <>
      {!orders.length ? (
        <div className={styles.noData}>暂无拼单数据</div>
      ) : (
        <div>
          <div className="text-sm p-2  font-bold">
            如需关闭某个正在进行中的拼团，请您前往拼多多取消拼团,取消后本小程序的用户将无法参与您发布的拼团。
          </div>
          <div className={styles.orderContainer}>
            {orders.map((order) => (
              <OrderCard
                key={order.groupOrderId}
                orderData={order}
                onClick={() => handleCardClick(order)}
              />
            ))}
            {orderState.visible && orderState.state && (
              <div className="fade-out fixed top-1/2 left-1/2 translate-x-y bg-black/75 text-white shadow px-4 py-2 rounded">
                拼单已{orderState.state === "fulfilled" ? "拼满" : "过期"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const OrderCard = ({
  orderData,
  onClick,
}: {
  orderData: OrderData;
  onClick: () => void;
}) => {
  const orderState =
    new Date(orderData.expireTime).getTime() > Date.now()
      ? orderData.groupRemainCount > 0
        ? "进行中"
        : "已拼满"
      : "已过期";
  return (
    <div className={styles.orderCard} onClick={onClick}>
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
