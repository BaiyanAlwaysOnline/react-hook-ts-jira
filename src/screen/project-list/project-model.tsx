import styled from "@emotion/styled";
import { Button, Drawer, Form, Input } from "antd";
import { useProjectModal } from "./utils";
import { useAddProject, useEditProject } from "../../utils/useProjects";
import { useForm } from "antd/es/form/Form";
import { UserSelect } from "../../components/user-select";
import { useEffect } from "react";
import { ErrorBox, FullLoadingPage } from "../../components/libs";

export const ProjectModel = () => {
  const [form] = useForm();
  const { close, projectModalOpen, editingProject, isLoading } =
    useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";

  // 确定是要编辑还是新增
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const {
    mutateAsync,
    isLoading: muteProjectLoading,
    error,
  } = useMutateProject();

  const onFinish = (values: any) => {
    // 编辑时editingProject有值，新增时没有
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      width={"50vw"}
      visible={projectModalOpen}
      onClose={close}
    >
      <ProjectModelContainer>
        {isLoading ? (
          <FullLoadingPage spinning={isLoading} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              style={{ width: "40rem" }}
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item label={"名称"} name="name" required>
                <Input />
              </Form.Item>
              <Form.Item label={"部门"} name="organization" required>
                <Input />
              </Form.Item>
              <Form.Item label={"负责人"} name="personId">
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={muteProjectLoading}
                  htmlType={"submit"}
                  type={"primary"}
                  children={"保存"}
                />
              </Form.Item>
            </Form>
          </>
        )}
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
