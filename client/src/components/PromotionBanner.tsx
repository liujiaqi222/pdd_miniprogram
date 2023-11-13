import { Image } from "@tarojs/components";
import { navigateToMiniProgram } from "@tarojs/taro";
import { PDD_COUPON_APPID } from "../consts";
import { useConfigStore } from "../store";

const PromotionBanner = () => {
  const bannerConfig = useConfigStore((state) => state.config.promotionBanner);
  const handleNavigate = () => {
    navigateToMiniProgram({
      appId: PDD_COUPON_APPID,
      path: bannerConfig.url,
    });
  };
  return (
    <Image
      src={bannerConfig.image}
      mode="aspectFill"
      style={{ height: "5.5em", width: "100%" }}
      className="shadow-lg rounded-lg"
      onClick={handleNavigate}
    ></Image>
  );
};

export default PromotionBanner;
