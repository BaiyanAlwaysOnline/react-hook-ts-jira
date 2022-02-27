import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { Project } from "../../types/project";

interface SearchPanelProps {
  param: Partial<Pick<Project, "personId" | "name">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
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
        <UserSelect
          value={param.personId}
          onChange={(personId) => setParam({ ...param, personId })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
