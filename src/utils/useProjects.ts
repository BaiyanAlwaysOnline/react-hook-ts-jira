import { Project } from "types/projects";
import { useHttp } from "./useHttp";
import { cleanObject } from "./utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

// 查询项目列表
export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp();
  const queryProject = () =>
    request("projects", { data: cleanObject(param || {}) });

  return useQuery<Project[]>(["projects", param], () => queryProject());
};

// 编辑项目
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

// 新增项目
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

// 查询项目详情
export const useProject = (projectId?: number) => {
  const request = useHttp();
  return useQuery<Project>(
    ["project", projectId],
    () => request(`projects/${projectId}`),
    {
      enabled: !!projectId,
    }
  );
};
