import { useAsync } from "./useAsync";
import { Project } from "types/projects";
import { useHttp } from "./useHttp";
import { useEffect } from "react";
import { cleanObject } from "./utils";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useHttp();
  const queryProject = () =>
    request("projects", { data: cleanObject(param || {}) });
  useEffect(() => {
    run(queryProject(), { retry: queryProject });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

export const useEditProject = () => {
  const request = useHttp();
  const { run, ...rest } = useAsync<Partial<Project>>();

  return {
    mutate: (id: number, params: {}) => {
      return run(
        request(`projects/${id}`, {
          method: "PATCH",
          data: params,
        })
      );
    },
    ...rest,
  };
};
