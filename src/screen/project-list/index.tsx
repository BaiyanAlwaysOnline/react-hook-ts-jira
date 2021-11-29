import Search from "./search";
import List from "./list";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils/hooks";
import { Typography } from "antd";
import { useProjects } from "utils/useProjects";
import { useUsers } from "utils/useUsers";
import { useUrlQueryParams } from "utils/useUrlQueryParams";

const ProjectListIndex = () => {
  // params
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  const debouncedParams = useDebounce(param, 200);
  //userData
  const { data: userData } = useUsers();
  //listData
  const { data: listData, error, isLoading } = useProjects(debouncedParams);
  //document title
  useDocumentTitle("项目列表管理");
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
