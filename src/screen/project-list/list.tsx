import { Project } from "types/projects";
import { User } from "types/user";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Table } from "antd";
import { Link } from "react-router-dom";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
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
          dataIndex: "name",
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
      ]}
      {...props}
    />
  );
};

export default List;
