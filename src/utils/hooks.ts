import { useCallback, useEffect, useRef, useState } from "react";

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

/**
 * @description 当组件卸载或者未加载时，返回false
 */
export const useMountRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 当我的页面卸载时，用回之前的title
  useEffect(() => {
    return () => {
      if (keepOnUnmount) document.title = oldTitle;
    };
  }, [oldTitle, keepOnUnmount]);
};

export const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const isMounted = useMountRef();
  return useCallback(
    (...args: T[]) => {
      isMounted ? dispatch(...args) : void 0;
    },
    [isMounted, dispatch]
  );
};
