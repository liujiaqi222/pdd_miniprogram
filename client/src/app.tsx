// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useEffect } from "react";
import { useDidShow, useDidHide } from "@tarojs/taro";
import { OpenIdContext } from "./context";
import { useUserLogin } from "./hooks/login";
import { useConfigStore } from "./store";

// 全局样式
import "./app.scss";

function App(props: any) {
  const { openId } = useUserLogin();
  const fetchConfig = useConfigStore((state) => state.fetchConfig);

  // 对应 onShow
  useDidShow((options) => {
    console.log(options)
  });

  // 对应 onHide
  useDidHide(() => {});

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return (
    <OpenIdContext.Provider value={openId}>
      {props.children}
    </OpenIdContext.Provider>
  );
}

export default App;
