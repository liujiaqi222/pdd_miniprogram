import { useState } from "react";
import { message } from "antd";
import { Login } from "./components/Login";
import { login } from "@/api/index";
import { SetConfig } from "./components/AdminConfig";

// 简单弄一下，也不写啥路由了
function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (name: string, password: string) => {
    const { success, message, data } = await login({ name, password });

    if (success) {
      setIsLogin(true);
      messageApi.success(message);
      localStorage.setItem("token", data.token);
    } else {
      messageApi.error(message);
    }
  };
  return (
    <>
      {isLogin ? <SetConfig /> : <Login onLogin={handleLogin}></Login>}{" "}
      {contextHolder}
    </>
  );
}

export default App;
