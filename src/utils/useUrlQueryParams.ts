import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

// 根据参数数组获取到url query上对应的参数
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  // 浏览器api UrlSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return {
            ...prev,
            [key]: searchParams.get(key) || "",
          };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      setSearchParams({
        ...Object.fromEntries(searchParams), // 和Object.entries作用相反
        ...params,
      } as URLSearchParamsInit);
    },
  ] as const;
};

// for of 只接受有iterator接口变量
// const obj = {
//   data: ["hello", "world"],
//   [Symbol.iterator]() {
//     const self = this;
//     let index = 0;
//     return {
//       next() {
//         if (index < self.data.length) {
//           return {
//             value: self.data[index++] + "!",
//             done: false
//           };
//         } else {
//           return { value: undefined, done: true };
//         }
//       }
//     };
//   }
// };
//
// for (let o of obj) {
//   console.log(o);
// }
