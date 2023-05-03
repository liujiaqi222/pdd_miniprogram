// Taro 额外添加的 hooks 要从 '@tarojs/taro' 中引入
import { useDidShow, useDidHide } from "@tarojs/taro";
import { OpenIdContext } from "./context";
import { useUserLogin } from "./hooks/login";

// 全局样式
import "./app.scss";

function App(props: any) {
  const {openId} = useUserLogin()
  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return (
    <OpenIdContext.Provider value={openId}>
      {props.children}
    </OpenIdContext.Provider>
  );
}

export default App;
