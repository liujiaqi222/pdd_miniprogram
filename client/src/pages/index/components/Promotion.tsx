import { navigateToMiniProgram } from "@tarojs/taro";
import AutoNewGroup from "./AutoNewGroup";
import { PDD_COUPON_APPID } from "../../../consts";
import { useConfigStore } from "../../../store";

const Promotion = () => {
  const config = useConfigStore((state) => state.config);
  const handleNavigate = (prefix: string, url: string) => {
    navigateToMiniProgram({
      appId: PDD_COUPON_APPID,
      path: `${prefix}${encodeURIComponent(url)}`,
    });
  };
  return (
    <div className="flex flex-col gap-2 px-4 mb-4">
      <AutoNewGroup />
      <div className="flex justify-center gap-5 mt-3">
        {config?.promotionArr.map((item) => {
          return (
            <div
              className="flex flex-col gap-1 items-center"
              key={item.name}
              onClick={() => handleNavigate(item.prefix, item.url)}
            >
              <img src={item.image} alt="promotion" className="w-7 h-7" />
              <div className="text-[#555]">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promotion;
