import { navigateToMiniProgram } from "@tarojs/taro";
import { PDD_COUPON_APPID } from "../consts";

import { useConfigStore } from "../store";

export const useRedirectToAutoNewGroup = () => {
  const config = useConfigStore((state) => state.config);
  const handleNavigateToOpenNewGroup = () => {
    navigateToMiniProgram({
      appId: PDD_COUPON_APPID,
      path: config?.autoNewGroupURL,
    });
  };
  return { handleNavigateToOpenNewGroup };
};
