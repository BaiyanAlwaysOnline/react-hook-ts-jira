import { useDocumentTitle } from "../../utils/hooks";
import {
  useKanbanSearchParams,
  useProjectInUrlById,
  useTaskSearchParams,
} from "./utils";
import { useKanbans } from "../../utils/kanban";
import styled from "@emotion/styled";
import { Kanban } from "../../types/kanban";
import { useTask } from "../../utils/task";
import { TaskIndex } from "./task";
import { Row, ScreenContainer } from "../../components/libs";
import { Input } from "antd";
import { useSetUrlParams } from "../../utils/useUrlQueryParams";
import { UserSelect } from "../../components/user-select";

const KanbanScreen = () => {
  useDocumentTitle("看板");
  const { data: currentProject } = useProjectInUrlById();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h2>{currentProject?.name}看板</h2>
      <SearchPanel />
      <KanbanContainer>
        {kanbans?.map((kanban) => {
          return <KanbanColumn kanban={kanban} key={kanban.id} />;
        })}
      </KanbanContainer>
    </ScreenContainer>
  );
};

const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlParams();
  return (
    <Row gap marginBottom={2}>
      <Input
        placeholder={"请输入任务名"}
        style={{ width: "20rem" }}
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(id) => {
          setSearchParams({
            processorId: id,
          });
        }}
      />
    </Row>
  );
};

const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: tasks } = useTask(useTaskSearchParams());
  const currentTask = tasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <div>
        {currentTask?.map((task) => (
          <TaskIndex key={task.id} task={task} />
        ))}
      </div>
    </Container>
  );
};

const KanbanContainer = styled.div`
  display: flex;
  flex: 1;
  > * {
    margin-right: 2rem;
  }
`;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  overflow-y: scroll;
`;

export default KanbanScreen;
