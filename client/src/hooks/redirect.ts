import { useContext } from "react";
import { navigateToMiniProgram } from "@tarojs/taro";
import { PDD_COUPON_APPID } from "../consts";
import { OpenIdContext } from "../context";
import { encodeCustomParams } from "../utils";
import { useConfigStore } from "../store";

export const useRedirectToAutoNewGroup = () => {
  const config = useConfigStore((state) => state.config);
  const openId = useContext(OpenIdContext);

  const handleNavigateToOpenNewGroup = () => {
    navigateToMiniProgram({
      appId: PDD_COUPON_APPID,
      path: config?.autoNewGroupURL + encodeCustomParams(openId),
    });
  };
  return { handleNavigateToOpenNewGroup };
};
