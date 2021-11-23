import { useAuth } from "context/auth";
import request from "./request";


export const useHttp = () => {
    const { user } = useAuth();
    // 两个函数的参数类型是一样的，通过 Parameters<typeof http> 直接将类型映射到另一个函数
    return (...[endPoint, config]: Parameters<typeof request>) =>
      request(endPoint, { ...config, token: user?.token });
  };