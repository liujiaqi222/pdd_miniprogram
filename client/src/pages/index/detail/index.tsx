import {
  setClipboardData,
  navigateToMiniProgram,
  getCurrentPages,
  showLoading,
  hideLoading,
  showToast,
  switchTab,
  useShareAppMessage,
} from "@tarojs/taro";
import { useEffect } from "react";
import { formatDate } from "../../../utils";
import { PDD_URL, PDD_APPID, getPddMiniProgramURL } from "../../../consts";
import { useOrderDataStore } from "../../../store";
import { getOrderById } from "../../../api/index";
import styles from "./index.module.scss";
import Card from "../components/Card";
import pddLogo from "../../../assets/pdd-logo.svg";
import copySvg from "../../../assets/copy.svg";
import { OrderData } from "../../../api/types";

const OrderDetail = () => {
  const order = useOrderDataStore((state) => state.orderData);
  const groupOrderId = getCurrentPages().at(-1)?.options?.groupOrderId;

  useShareAppMessage(() => {
    return {
      title: `百亿拼团GO | ${order.goodsName}`,
      path: `/pages/index/detail/index?groupOrderId=${order.groupOrderId}`,
      imageUrl: order.hdThumbUrl,
    };
  });
  useEffect(() => {
    if (groupOrderId) {
      showLoading();
      useOrderDataStore.getState().setOrderData({} as OrderData);

      getOrderById(groupOrderId)
        .then((res) => {
          hideLoading();
          if (!res.data.data) {
            showToast({ title: "拼团已过期", icon: "error" });
            setTimeout(() => {
              switchTab({ url: "/pages/index/index" });
            }, 1000);
            return;
          }
          useOrderDataStore.getState().setOrderData(res.data.data);
        })
        .catch(() => {
          hideLoading();
        });
    }
  }, [groupOrderId]);
  const handleNavigate = () => {
    navigateToMiniProgram({
      appId: PDD_APPID,
      path: getPddMiniProgramURL(order!.groupOrderId),
      envVersion: "release",
    });
  };

  return (
    <div className={styles.container}>
      <Card order={order!} shareBtn />
      <div className={styles.info}>
        <div className={styles.text}>
          拼团到期时间：
          {order?.expireTime ? formatDate(new Date(order?.expireTime)) : ""}
        </div>
        <div className={styles.text}>
          目前还差：{order?.groupRemainCount} {order?.groupRemainCount && "人"}
        </div>
        {order?.groupUserList?.length && (
          <div className={styles.userList}>
            <div className={styles.text}>当前拼团用户：</div>
            {order?.groupUserList?.map((user) => (
              <img
                key={user.avatar}
                src={user.avatar}
                className={styles.avatar}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.operationContainer}>
        <div
          className={styles.button}
          onClick={handleNavigate}
          style={{ backgroundColor: "#f40006" }}
        >
          {" "}
          <img className={styles.img} src={pddLogo} /> 前往拼多多
        </div>
        <div
          className={styles.button}
          onClick={() =>
            setClipboardData({ data: `${PDD_URL}${order?.groupOrderId}` })
          }
        >
          <img className={styles.img} src={copySvg} alt="" />
          复制拼团链接
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
