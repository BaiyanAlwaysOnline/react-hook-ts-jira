// 获取项目id
import { useLocation } from "react-router-dom";
import { useProject } from "../../utils/useProjects";
import { useUrlQueryParams } from "../../utils/useUrlQueryParams";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const projectId = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(projectId);
};

export const useProjectInUrlById = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTaskSearchParams = () => {
  const [params] = useUrlQueryParams(["name", "processorId"]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      name: params.name || undefined,
      processorId: Number(params.processorId) || undefined,
    }),
    [params, projectId]
  );
};

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];
export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];
