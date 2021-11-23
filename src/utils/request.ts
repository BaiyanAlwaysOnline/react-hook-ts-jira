/**
 * @file 基于fetch封装通用请求方法
 */
import { apiUrl } from "constant/http";
import * as auth from "auth-provider";
import qs from "qs";

interface HTTPConfig extends RequestInit {
  token?: string;
  data?: object;
}

const request = (
  endPoint: string,
  { token, data, headers, ...customConfig }: HTTPConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token || "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endPoint += "?" + qs.stringify(data);
  } else {
    config.body = JSON.stringify(data || {});
  }
  // 处理参数
  return fetch(`${apiUrl}/${endPoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // 说明未登录或者登录信息过期
      await auth.logout();
      window.location.reload();
      return Promise.reject("请重新登录");
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
      return Promise.reject(data);
    }
  });
};

export default request;
