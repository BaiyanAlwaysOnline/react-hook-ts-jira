import { Task } from "types/task";
import { useTaskType } from "utils/task";
import bug from "assets/bug.svg";
import task from "assets/task.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { Mark } from "../../components/mask";
import { useTaskSearchParams } from "./utils";

export const TaskIndex = ({ task }: { task: Task }) => {
  const searchParam = useTaskSearchParams();
  return (
    <TasksContainer>
      <Card style={{ marginBottom: ".5rem" }}>
        <div>
          <Mark keyword={searchParam.name || ""} value={task.name} />
        </div>
        <TaskIcon id={task.typeId} />
      </Card>
    </TasksContainer>
  );
};

export const TaskIcon = ({ id }: { id: Task["id"] }) => {
  const { data: taskType } = useTaskType();
  const currentTaskType = taskType?.find((item) => item.id === id);
  return <img src={currentTaskType?.name === "bug" ? bug : task} />;
};

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
