import { Project } from "types/projects";
import { useHttp } from "./useHttp";
import { cleanObject } from "./utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp();
  const queryProject = () =>
    request("projects", { data: cleanObject(param || {}) });

  return useQuery(["projects", param], () => queryProject());
};

export const useEditProject = () => {
  const request = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) => {
      return request(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};

export const useAddProject = () => {
  const request = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) => {
      return request(`projects`, {
        method: "POST",
        data: params,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};
