import { useContext, useEffect, useState } from "react";
import { navigateToMiniProgram } from "@tarojs/taro";
import { PDD_COUPON_APPID } from "../consts";
import { OpenIdContext } from "../context";
import { encodeCustomParams } from "../utils";
import { useConfigStore } from "../store";
import { genMultiGroupPromotionUrl } from "../api";

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

export const useOpenTheSameGroup = (linkUrl: string) => {
  const openId = useContext(OpenIdContext);
  const config = useConfigStore((state) => state.config);

  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await genMultiGroupPromotionUrl(linkUrl, openId);
      setUrl(result);
    };
    fetchData();
  }, [linkUrl, openId]);

  const navigateToOpenTheSameGroup = () => {
    navigateToMiniProgram({
      appId: PDD_COUPON_APPID,
      path: url
        ? `pages/share/index.html?src=${encodeURIComponent(url)}`
        : `${config?.autoNewGroupURL}${encodeCustomParams(openId)}`,
    });
  };

  return { navigateToOpenTheSameGroup };
};
