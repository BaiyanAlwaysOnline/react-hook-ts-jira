import { useState } from "react";
import Login from "./login";
import Register from "./register";

const UnAuthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <div>{isLogin ? <Login /> : <Register />}</div>
      <button onClick={() => setIsLogin(!isLogin)}>点击切换</button>
    </div>
  );
};

export default UnAuthenticatedApp;
