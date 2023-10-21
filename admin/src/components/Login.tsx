import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  onLogin :(name:string,password:string)=>void
}
export const Login = ({onLogin}:Props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Input
            type="text"
            placeholder="用户名"
            className="outline-none"
            autoComplete="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="密码"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center mt-3">
            <Button type="button" onClick={() => onLogin(name, password)}>
              登录
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
