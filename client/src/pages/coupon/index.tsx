import { useEffect, useState } from "react";
import {
  ScrollView,
  type BaseEventOrig,
  type ScrollViewProps,
} from "@tarojs/components";
import {
  getSystemInfoSync,
  showLoading,
  hideLoading,
  stopPullDownRefresh,
} from "@tarojs/taro";
import SearchInput from "../../components/SearchInput";
import type { CouponData } from "../../api/types";

import { useCouponFetch } from "./hooks/useCouponList";

const phoneInfo = getSystemInfoSync();
const remWidth = phoneInfo.windowWidth / 20;
const Coupon = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { data, loading, hasMore } = useCouponFetch(currentPage, searchKey);
  console.log(data);
  if (loading) {
    showLoading({ title: "加载中" });
  } else {
    hideLoading();
    stopPullDownRefresh();
  }
  function handleScroll(e: BaseEventOrig<ScrollViewProps.onScrollDetail>) {
    if (loading || !hasMore) return;
    if (
      e.detail.scrollTop + (phoneInfo.windowHeight - 3.5 * remWidth) >=
      e.detail.scrollHeight - 8 * remWidth
    ) {
      setCurrentPage(currentPage + 1);
    }
  }
  useEffect(() => {
    setCurrentPage(0);
  }, [searchKey]);
  return (
    <div className="bg-[#ff1a1a] px-4 h-screen flex flex-col gap-4">
      <SearchInput
        onClear={() => setSearchKey("")}
        onSearch={(key) => setSearchKey(key)}
      />
      <ScrollView
        scrollY
        enableFlex
        scrollWithAnimation
        className="h-[calc(100vh_-_3.5rem)] "
        onScroll={(e) => handleScroll(e)}
      >
        {data?.map((item) => (
          <Card item={item} key={item.goods_sign} />
        ))}
      </ScrollView>
    </div>
  );
};

const Card = ({ item }: { item: CouponData }) => {
  return (
    <div className="flex gap-2 p-2 bg-white mb-3 rounded-lg shadow">
      {/* 左边图片 */}
      <div className="relative">
        <img
          src={item.goods_image_url}
          alt={item.goods_name}
          className="h-32 w-32 shadow rounded"
        />
        <span className="absolute top-1 right-1 px-1 text-white  text-xs  bg-[#fc1a1a] shadow rounded-xs">
          已售{item.sales_tip}
        </span>
      </div>
      {/* 右边文字描述 */}
      <div>
        <div className="text-overflow-2 ">{item.goods_name}</div>
        <div className=" text-sm text-[#fc1a1a] border border-[#fc1a1a] border-solid w-fit px-2  rounded-full mt-2 mb-4">
          {item.coupon_discount / 100}元优惠券
        </div>
        <div className="flex justify-between items-end">
          <div className="flex  gap-4">
            <div className="text-[#fc1a1a] ">
              <span className="flex items-baseline ">
                ￥
                <span className="text-lg">
                  {(item.min_group_price - item.coupon_discount) / 100}
                </span>
              </span>
              <span className="text-sm ml-1">券后价</span>
            </div>
            <div className="text-gray-500">
              <span className="flex items-baseline ">
                ￥<span className="text-lg">{item.min_group_price / 100}</span>
              </span>
              <span className="text-sm ml-2">拼团价</span>
            </div>
          </div>
          {/* 按钮 */}
          <div className="px-2 py-1 mb-2 bg-[#fc1a1a] text-white rounded">
            领券下单
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
