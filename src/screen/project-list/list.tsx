import { User } from "types/user";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Popover, Space, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import {
  useDeleteProject,
  useEditProject,
  useProjectQueryKey,
} from "../../utils/useProjects";
import { useProjectModal } from "./utils";
import { Project } from "../../types/project";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  // id和pin不是同一时刻传递的，可以使用函数式编程的思想
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          align: "center",
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          align: "center",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          align: "center",
          title: "部门",
          dataIndex: "organization",
        },
        {
          align: "center",
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          align: "center",
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          align: "center",
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEditProject } = useProjectModal();
  const { mutate } = useDeleteProject(useProjectQueryKey());
  const startEdit = (id: number) => startEditProject(id);
  return (
    <Popover
      content={
        <Space direction={"vertical"}>
          <Typography.Link onClick={() => startEdit(project.id)}>
            编辑
          </Typography.Link>
          <Typography.Link onClick={() => mutate({ id: project.id })}>
            删除
          </Typography.Link>
        </Space>
      }
      placement={"bottom"}
    >
      <Typography.Link>...</Typography.Link>
    </Popover>
  );
};

export default List;
