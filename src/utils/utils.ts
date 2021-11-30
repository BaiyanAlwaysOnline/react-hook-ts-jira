export const resetRoute = () => (window.location.href = window.location.origin);

const isVoid = (param: unknown) =>
  param === "" || param === undefined || param === null;

/**
 * @description 无效的value全部删掉
 * @param obj
 * @returns
 */
export const cleanObject = (obj?: { [k: string]: any }) => {
  if (!obj) return {};
  const copy = { ...obj };
  Object.keys(copy).forEach((key) => {
    if (isVoid(copy[key])) {
      Reflect.deleteProperty(copy, key);
    }
  });
  return copy;
};
