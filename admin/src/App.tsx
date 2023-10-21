import { useState } from "react";
import { Login } from "./components/Login";
import { login } from "@/api/index";
import { Toaster } from "@/components/ui/toaster";

import AdminConfig from "./components/AdminConfig";

// 简单弄一下，也不写啥路由了
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = async (name: string, password: string) => {
    const result = await login({ name, password });
    if (result.status === 200) {
      setIsLogin(true);
      localStorage.setItem("token", result.data.token);
    }
  };
  return (
    <>
      {isLogin ? <AdminConfig /> : <Login onLogin={handleLogin}></Login>}
      <Toaster />
    </>
  );
}

export default App;
