import { useUrlQueryParams } from "../../utils/useUrlQueryParams";
import { useMemo } from "react";

export const useProjectSearchParams = () => {
  // params
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

// 使用url参数管理project-modal的显示和隐藏
export const useProjectModal = () => {
  const [{ projectModalOpen }, setProjectModalOpen] = useUrlQueryParams([
    "projectModalOpen",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParams([
    "editingProjectId",
  ]);

  const close = () => setProjectModalOpen({ projectModalOpen: undefined });
  const open = () => setProjectModalOpen({ projectModalOpen: true });

  return {
    close,
    open,
    projectModalOpen: projectModalOpen === "true",
  };
};
