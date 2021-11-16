import { useAuth } from "./context/auth";
import { useHttp, useMount } from "./utils/hooks";
import { Button } from "antd";

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const http = useHttp();
  useMount(() => {
    http("projects", { token: user?.token });
  });
  return (
    <div>
      this is Authenticated page <br />
      <Button
        onClick={() => {
          logout();
          window.location.reload();
        }}
      >
        退出登录
      </Button>
    </div>
  );
};

export default AuthenticatedApp;
