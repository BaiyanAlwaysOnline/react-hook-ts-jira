import React from "react";
import { Form, Input, Select } from "antd";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: { personId: string; name: string };
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
        <Select
          defaultValue={""}
          onChange={(e) => setParam({ ...param, personId: e })}
        >
          <Select.Option key={0} value={""}>
            项目负责人
          </Select.Option>
          {users.map(({ id, name }) => {
            return (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
