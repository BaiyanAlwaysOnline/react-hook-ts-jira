import { useAuth } from "./context/auth";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      this is Authenticated page <br />{" "}
      <button onClick={() => logout()}>退出登录</button>
    </div>
  );
};

export default AuthenticatedApp;
