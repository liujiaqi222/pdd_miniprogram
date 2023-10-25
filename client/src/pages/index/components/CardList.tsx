import { useEffect, useState } from "react";
import {
  getSystemInfoSync,
  showLoading,
  hideLoading,
  stopPullDownRefresh,
  navigateTo,
  usePageScroll,
  switchTab,
} from "@tarojs/taro";
import { AdCustom, View } from "@tarojs/components";
import { useOrderDataStore } from "../../../store";
import { useOrderSearch } from "../hooks/useOrderSearch";
import Card from "./Card";
import type { OrderParams, OrderData } from "../../../api/types";
import Loading from "../../../components/Loading";

const phoneInfo = getSystemInfoSync();
const remWidth = phoneInfo.windowWidth / 20;

// 这里用scroll实现无限加载，微信小程序不支持ObserverIntersection
// 每个盒子的高度是6rem小程序：1rem = 屏幕的宽度除以20
const CardList = ({ searchKey, listType }: Required<OrderParams>) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { orders, loading, hasMore } = useOrderSearch(
    searchKey,
    listType,
    pageNumber
  );
  const setOrderData = useOrderDataStore((state) => state.setOrderData);
  if (loading && pageNumber === 0) {
    showLoading({ title: "加载中" });
  }
  if (!loading) {
    hideLoading();
    stopPullDownRefresh();
  }
  useEffect(() => {
    setPageNumber(0);
    console.log("ListType", listType);
  }, [searchKey, listType]);

  const handleClick = (order: OrderData) => {
    navigateTo({
      url: `/pages/index/detail/index`,
    });
    setOrderData(order);
  };
  // 每个卡片高度是6rem，每页10个卡片，所以每页高度是60rem+9*0.5rem的gap 然后除以10每个卡片的高度就是6.45rem
  // 6.45rem * 10 * pageNumber就是当前页的高度 滚动条的高度是scrollTop + 屏幕的高度 - 5rem
  usePageScroll(({ scrollTop }) => {
    if (loading || !hasMore) return;
    if (
      scrollTop + phoneInfo.windowHeight - 5 * remWidth >
      6.45 * remWidth * 10 * pageNumber
    ) {
      setPageNumber(pageNumber + 1);
    }
  });
  return (
    <View className="bg-[#f5f5f5] flex flex-col gap-4">
      {orders.map((order, index) => {
        return (
          <>
            <Card
              order={order}
              key={order.groupOrderId}
              onClick={() => handleClick(order)}
            />
            {index !== 0 && index % 20 === 0 && index !== orders.length - 1 && (
              <View className="rounded-lg overflow-hidden">
                <AdCustom unitId="adunit-969c008b29c955e2"></AdCustom>
              </View>
            )}
          </>
        );
      })}
      {loading && pageNumber !== 0 && <Loading />}
      {!hasMore &&
        (searchKey ? (
          <View className="flex items-center justify-center text-sm pb-4 ">
            {orders.length
              ? "没有找到您想要的拼团？"
              : "无相关拼团，试试切换关键词或"}
            <span
              className="underline underline-offset-4 text-base"
              onClick={() => switchTab({ url: "/pages/create/index" })}
            >
              去发布
            </span>
          </View>
        ) : (
          <View className="text-center text-sm pb-4 ">==无更多拼单信息==</View>
        ))}
    </View>
  );
};

export default CardList;
