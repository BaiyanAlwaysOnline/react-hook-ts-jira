import { useAsync } from "./useAsync";
import { Project } from "types/projects";
import { useHttp } from "./useHttp";
import { useEffect } from "react";

export const useProjects = (param?: { name: string; personId: string }) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useHttp();
  useEffect(() => {
    run(request("projects", { data: param || {} }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
