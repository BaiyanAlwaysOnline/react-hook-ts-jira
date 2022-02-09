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
  const [{ projectModalEdit }, setProjectModalEdit] = useUrlQueryParams([
    "projectModalEdit",
  ]);

  const close = () => setProjectModalEdit({ projectModalEdit: undefined });
  const open = () => setProjectModalEdit({ projectModalEdit: true });

  return {
    close,
    open,
    projectModalEdit: projectModalEdit === "true",
  };
};
