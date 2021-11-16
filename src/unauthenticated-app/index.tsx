import { useState } from "react";
import Login from "./login";
import Register from "./register";
import { Button } from "antd";

const UnAuthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <div>{isLogin ? <Login /> : <Register />}</div>
      <Button onClick={() => setIsLogin(!isLogin)}>点击切换</Button>
    </div>
  );
};

export default UnAuthenticatedApp;
