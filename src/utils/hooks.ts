import { useEffect, useState } from "react";
import { useAuth } from "context/auth";
import request from "./request";

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(array: T[]) => {
  const [value, setValue] = useState(array);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useHttp = () => {
  const { user } = useAuth();
  // 两个函数的参数类型是一样的，通过 Parameters<typeof http> 直接将类型映射到另一个函数
  return (...[endPoint, config]: Parameters<typeof request>) =>
    request(endPoint, { ...config, token: user?.token });
};
