import { useState } from "react";
import Search from "./search";
import List from "./list";
import styled from "@emotion/styled";
import { useDebounce } from "utils/hooks";
import { Typography } from "antd";
import { useProjects } from "utils/useProjects";
import { useUsers } from "utils/useUsers";

const ProjectListIndex = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParams = useDebounce(param, 200);
  const { data: userData } = useUsers();
  const { data: listData, error, isLoading } = useProjects(debouncedParams);

  return (
    <Container>
      <h1>项目列表</h1>
      <Search param={param} setParam={setParam} users={userData || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      ) : null}
      <List
        dataSource={listData || []}
        loading={isLoading}
        users={userData || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListIndex;
