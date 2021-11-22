import { useEffect } from "react";
import { User } from "../types/user";
import { useHttp } from "./hooks";
import { useAsync } from "./useAsync";

export const useUsers = (param?: Partial<User>) => {
  const request = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(request("users", { data: param || {} }));
  }, [param]);
  return {
    ...result,
  };
};
