import React from "react";
import { Form, Input } from "antd";
import { User } from "types/user";
import { IdSelect } from "components/id-select";
import { Project } from "types/projects";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "personId" | "name">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <IdSelect
          value={param.personId}
          defaultOptionName={"项目负责人"}
          options={users}
          onChange={(personId) => setParam({ ...param, personId })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
