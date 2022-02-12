import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../types/projects";

const useQueryConfig = (queryKey: QueryKey, cb: Function) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    // useMutation刚发生时就触发
    onMutate: (newData: any) => {
      // 备份旧数据
      const oldData = queryClient.getQueryData(queryKey);
      // 手动设置数据实现乐观更新
      queryClient.setQueryData(queryKey, (old?: Project[]) => cb(newData, old));
      return {
        oldData,
      };
    },
    // 当接口异常，数据更新失败时，回滚
    onError: (error: any, newData: any, ctx: any) => {
      queryClient.setQueryData(queryKey, ctx.oldData);
    },
  };
};

export const useEditQueryConfig = (queryKey: QueryKey) => {
  return useQueryConfig(queryKey, (newData: any, oldData: any) => {
    return (
      oldData?.map((project: any) => {
        if (project.id === newData.id) {
          return {
            ...project,
            ...newData,
          };
        }
        return project;
      }) || []
    );
  });
};

export const useAddQueryConfig = (queryKey: QueryKey) => {
  return useQueryConfig(queryKey, (newData: any, oldData: any) => {
    return [...oldData, newData];
  });
};

export const useDeleteQueryConfig = (queryKey: QueryKey) => {
  return useQueryConfig(queryKey, (newData: any, oldData: any) => {
    return oldData.filter((item: any) => item.id !== newData.id);
  });
};
