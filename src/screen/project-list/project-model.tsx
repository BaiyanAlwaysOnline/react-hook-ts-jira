import styled from "@emotion/styled";
import { Drawer, Form, Input } from "antd";
import { useState } from "react";

export const ProjectModel = () => {
  const [visible, setVisible] = useState(true);

  const close = () => setVisible(false);
  const open = () => setVisible(true);

  return (
    <Drawer width={"50vw"} visible={visible} onClose={close}>
      <ProjectModelContainer>
        <h1>创建项目</h1>
        <Form style={{ width: "40rem" }} layout={"vertical"}>
          <Form.Item label={"名称"} required>
            <Input />
          </Form.Item>
          <Form.Item label={"部门"} required>
            <Input />
          </Form.Item>
          <Form.Item label={"负责人"}>
            <Input />
          </Form.Item>
        </Form>
      </ProjectModelContainer>
    </Drawer>
  );
};

const ProjectModelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
