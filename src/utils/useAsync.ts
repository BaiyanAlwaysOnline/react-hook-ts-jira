import { useState } from "react";

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
  const config = { ...defaultConfig, customConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...customState,
  });
  const setData = (data: D) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
    return data;
  };
  const setError = (error: Error) => {
    setState({
      data: null,
      error,
      stat: "error",
    });
    if (config.throwOnError) return Promise.reject(error);
    return error;
  };
  const run = (params: Promise<D>) => {
    // 参数为空，或者不是一个Promise
    if (!params || !params.then) {
      throw new Error("参数必须是一个 Promise");
    }
    setState({
      ...state,
      stat: "loading",
    });
    return params.then(setData, setError);
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    data: state.data,
    error: state.error,
  };
};
