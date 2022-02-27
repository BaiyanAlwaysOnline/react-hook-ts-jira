import { useHttp } from "./useHttp";
import { useQuery } from "react-query";
import { Task } from "../types/task";
import { TaskType } from "../types/taskType";

export const useTask = (param?: Partial<Task>) => {
  const request = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    request("tasks", { data: param })
  );
};

export const useTaskType = () => {
  const request = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => request("taskTypes"));
};
