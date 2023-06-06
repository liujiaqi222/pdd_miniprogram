import { useEffect, useState } from "react";
import {
  getSystemInfoSync,
  showLoading,
  hideLoading,
  stopPullDownRefresh,
  navigateToMiniProgram,
  usePageScroll,
} from "@tarojs/taro";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import type { CouponData } from "../../api/types";
import { useCouponFetch } from "./hooks/useCouponList";
import { generatePromotionUrl } from "../../api";

const phoneInfo = getSystemInfoSync();
const remWidth = phoneInfo.windowWidth / 20;
const Coupon = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { data, loading, hasMore } = useCouponFetch(currentPage, searchKey);
  if (loading && currentPage === 0) {
    showLoading({ title: "加载中" });
  }
  if (!loading) {
    hideLoading();
    stopPullDownRefresh();
  }

  const handleCardClick = (item: CouponData) => {
    generatePromotionUrl(item.goods_id, item.goods_sign).then((res) => {
      navigateToMiniProgram({
        appId: res.we_app_info.app_id,
        path: res.we_app_info.page_path,
      });
    });
  };
  usePageScroll(({ scrollTop }) => {
    if (loading || !hasMore) return;
    if (
      scrollTop + phoneInfo.windowHeight - 3 * remWidth >
      7 * remWidth * 20 * currentPage
    ) {
      setCurrentPage(currentPage + 1);
    }
  });
  useEffect(() => {
    setCurrentPage(0);
  }, [searchKey]);
  return (
    <div className="bg-primary relative  flex flex-col gap-4 min-h-screen">
      <div className="bg-primary  px-2 py-3 z-50 fixed top-0 w-[calc(100vw_-_1.2rem)]">
        <SearchInput
          onClear={() => setSearchKey("")}
          onSearch={(key) => setSearchKey(key)}
        />
      </div>
      <div className="mt-14 px-2   ">
        {data?.map((item) => (
          <Card
            item={item}
            key={item.goods_sign}
            onClick={() => handleCardClick(item)}
          />
        ))}
        {loading && currentPage !== 0 && <Loading />}
      </div>
    </div>
  );
};

const Card = ({ item, onClick }: { item: CouponData; onClick: () => void }) => {
  return (
    <div
      className="flex gap-2 p-2 bg-white mb-3 rounded-lg shadow "
      onClick={() => onClick()}
    >
      {/* 左边图片 */}
      <div className="relative mt-1">
        <img
          src={item.goods_image_url}
          alt={item.goods_name}
          className="h-28 w-28 shadow rounded"
        />
        <span className="absolute top-1 right-1 px-1 text-white  text-xs  bg-primary shadow rounded-xs">
          已售{item.sales_tip}
        </span>
      </div>
      {/* 右边文字描述 */}
      <div className="flex-1">
        <div className="text-overflow-2 text-sm h-10">{item.goods_name}</div>
        <div className=" text-sm text-red border border-red border-solid w-fit px-2  rounded-full mt-2 mb-2">
          {item.coupon_discount / 100}元优惠券
        </div>
        <div className="flex justify-between items-end">
          <div className="flex  gap-4">
            <div className="text-primary ">
              <span className="flex items-baseline ">
                ￥
                <span>
                  {(item.min_group_price - item.coupon_discount) / 100}
                </span>
              </span>
              <span className="text-sm ml-1">券后价</span>
            </div>
            <div className="text-gray-500">
              <span className="flex items-baseline ">
                ￥<span>{item.min_group_price / 100}</span>
              </span>
              <span className="text-sm ml-2">拼团价</span>
            </div>
          </div>
          {/* 按钮 */}
          <div className="px-2 py-1 mb-2 bg-primary-darker rounded text-white">
            领券下单
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
