import Search from "./search";
import List from "./list";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils/hooks";
import { Typography } from "antd";
import { useProjects } from "utils/useProjects";
import { useUsers } from "utils/useUsers";
import { useProjectSearchParams } from "./utils";
import { Row } from "../../components/libs";
import { ProjectModel } from "./project-model";

const ProjectListIndex = () => {
  //document title
  useDocumentTitle("项目列表管理");
  //userData
  const { data: userData } = useUsers();
  //listData
  const [param, setParam] = useProjectSearchParams();
  const {
    data: listData,
    error,
    isLoading,
    retry,
  } = useProjects(useDebounce(param, 200));

  return (
    <Container>
      <Row between marginBottom={3}>
        <h1>项目列表</h1>
        <Typography.Link>创建项目</Typography.Link>
      </Row>
      <Search param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      ) : null}
      <List
        dataSource={listData || []}
        loading={isLoading}
        users={userData || []}
        retry={retry}
      />
      <ProjectModel />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListIndex;
