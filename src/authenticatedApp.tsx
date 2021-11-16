import { useAuth } from "./context/auth";
import { useHttp, useMount } from "./utils/hooks";

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const http = useHttp();
  useMount(() => {
    http("projects", { token: user?.token });
  });
  return (
    <div>
      this is Authenticated page <br />{" "}
      <button onClick={() => logout()}>退出登录</button>
    </div>
  );
};

export default AuthenticatedApp;
