import { useCallback, useReducer, useState } from "react";
import { useSafeDispatch } from "./hooks";

type Status = "idle" | "loading" | "error" | "success";

interface State<D> {
  data: D | null;
  error: Error | null;
  stat: Status;
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
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultState,
      ...customState,
    }
  );
  // 当前使用useAsync的组件如果已经卸载，不在执行setState的操作
  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        error: null,
        stat: "success",
      });
      return data;
    },
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        error,
        stat: "error",
      });
      if (config.throwOnError) return Promise.reject(error);
      return error;
    },
    [config.throwOnError, safeDispatch]
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
      safeDispatch({
        stat: "loading",
      });
      return runPromise.then(setData, setError);
    },
    [setData, setError, safeDispatch]
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
