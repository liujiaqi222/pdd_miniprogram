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
import { AdCustom } from "@tarojs/components";
import { useEffect } from "react";
import { formatDate } from "../../../utils";
import { PDD_URL, PDD_APPID, getPddMiniProgramURL } from "../../../consts";
import { useOrderDataStore } from "../../../store";
import { getOrderById } from "../../../api/index";
import styles from "./index.module.scss";
import Card from "../components/Card";
import pddLogoWhite from "../../../assets/pdd-logo-white.svg";
import pddLogoRed from "../../../assets/pdd-logo-red.svg";
import Hourglass from "../../../assets/hourglass.svg";
import RemainAmount from "../../../assets/remainingAmount.svg";
import User from "../../../assets/user.svg";
import { OrderData } from "../../../api/types";
import Follow from "../../../components/Follow";

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
      <div className="p-2 rounded-lg shadow-lg bg-white border-4 border-primary-darker mb-4">
        <div className="mb-4 text-lg text-primary-darker font-bold">
          拼团详情
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <img src={Hourglass} className="w-4 h-4 mr-1" alt="到期时间" />
            <span className="font-semibold	text-[#555] ">到期时间：</span>
            {order?.expireTime ? formatDate(new Date(order?.expireTime)) : ""}
          </div>
          <div className={styles.text}>
            <img src={RemainAmount} className="w-4 h-4 mr-1" alt="剩余" />
            <span className="font-semibold	text-[#555]">目前还差：</span>
            {order?.groupRemainCount} {order?.groupRemainCount && "人"}
          </div>
          {order?.groupUserList?.length && (
            <div className={styles.userList}>
              <div className={styles.text}>
                <img src={User} className="w-4 h-4 mr-1" alt="拼团用户" />
                <span className="font-semibold	text-[#555]">拼团用户：</span>
              </div>
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
            className={`${styles.button} ${styles.goto}`}
            onClick={handleNavigate}
          >
            <img className={styles.img} src={pddLogoWhite} /> 前往拼多多
          </div>
          <div
            className={`${styles.button} ${styles.newGroup}`}
            onClick={() =>
              setClipboardData({ data: `${PDD_URL}${order?.groupOrderId}` })
            }
          >
            <img className={styles.img} src={pddLogoRed} /> 我要开新团
          </div>
        </div>
      </div>
      <Follow bgWhite />
      <div className="mt-4 flex justify-center ">
        <div className="rounded-lg shadow overflow-hidden">
          <AdCustom unitId="adunit-d238eeb612faeabe" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
