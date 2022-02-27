import { useHttp } from "./useHttp";
import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";

export const useKanbans = (param?: Partial<Kanban>) => {
  const request = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    request("kanbans", { data: param })
  );
};
