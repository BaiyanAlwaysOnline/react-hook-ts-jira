import { useUsers } from "../utils/useUsers";
import React from "react";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  //userData
  const { data: users } = useUsers();
  return (
    <IdSelect defaultOptionName={"负责人"} options={users || []} {...props} />
  );
};
