import { useCallback, useState } from "react";
import { useMountRef } from "./hooks";

interface State<D> {
  data: D | null;
  error: Error | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  data: null,
  error: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  customState?: State<D>,
  customConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...customConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...customState,
  });
  const [retry, setRetry] = useState(() => () => {});
  const isMounted = useMountRef();
  const setData = useCallback(
    (data: D) => {
      // 当前使用useAsync的组件如果已经卸载，不在执行setState的操作
      if (!isMounted.current) return;
      setState({
        data,
        error: null,
        stat: "success",
      });
      return data;
    },
    [setState, isMounted]
  );
  const setError = useCallback(
    (error: Error) => {
      // 当前使用useAsync的组件如果已经卸载，不在执行setState的操作
      if (!isMounted.current) return;
      setState({
        data: null,
        error,
        stat: "error",
      });
      if (config.throwOnError) return Promise.reject(error);
      return error;
    },
    [setState, isMounted, config.throwOnError]
  );
  const run = useCallback(
    (runPromise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      // 参数为空，或者不是一个Promise
      if (!runPromise || !runPromise.then) {
        throw new Error("参数必须是一个 Promise");
      }
      if (runConfig) {
        setRetry(() => () => run(runConfig.retry?.()));
      }
      // ! 在useCallBack中使用setState，会导致无限循环，通过functional setState解决
      setState((prevState) => ({
        ...prevState,
        stat: "loading",
      }));
      return runPromise.then(setData, setError);
    },
    [setData, setError]
  );
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // 重新run，然后刷新state，触发UI重新渲染
    retry,
    data: state.data,
    error: state.error,
  };
};
