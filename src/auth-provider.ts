// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "types/user";
import { message } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    let res = await response.json();
    if (response.ok) {
      message.success("登录成功");
      return handleUserResponse(res);
    } else {
      message.error(res.message);
      return Promise.reject(res);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    let res = await response.json();
    if (response.ok) {
      message.success("注册成功");
      return handleUserResponse(res);
    } else {
      message.error(res.message);
      return Promise.reject(res);
    }
  });
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
