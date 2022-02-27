import { useHttp } from "./useHttp";
import { cleanObject } from "./utils";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useProjectSearchParams } from "../screen/project-list/utils";
import {
  useAddQueryConfig,
  useDeleteQueryConfig,
  useEditQueryConfig,
} from "./useQueryConfig";
import { Project } from "../types/project";

// 查询项目列表
export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp();
  const queryProject = () =>
    request("projects", { data: cleanObject(param || {}) });

  return useQuery<Project[]>(["projects", param], () => queryProject());
};

// 编辑项目
export const useEditProject = (queryKey: QueryKey) => {
  const request = useHttp();
  // queryKey非常重要
  return useMutation((params: Partial<Project>) => {
    return request(`projects/${params.id}`, {
      method: "PATCH",
      data: params,
    });
  }, useEditQueryConfig(queryKey));
};

// 新增项目
export const useAddProject = (queryKey: QueryKey) => {
  const request = useHttp();
  return useMutation((params: Partial<Project>) => {
    return request(`projects`, {
      method: "POST",
      data: params,
    });
  }, useAddQueryConfig(queryKey));
};

// 删除项目
export const useDeleteProject = (queryKey: QueryKey) => {
  const request = useHttp();
  return useMutation(({ id }: { id: Project["id"] }) => {
    return request(`projects/${id}`, {
      method: "DELETE",
    });
  }, useDeleteQueryConfig(queryKey));
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

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};
