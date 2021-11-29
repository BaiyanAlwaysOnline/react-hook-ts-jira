import { useAsync } from "./useAsync";
import { Project } from "types/projects";
import { useHttp } from "./useHttp";
import { useEffect } from "react";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const request = useHttp();
  useEffect(() => {
    run(request("projects", { data: param || {} }));
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
