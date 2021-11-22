import { useAuth } from "../context/auth";
import { Form, Input } from "antd";
import { LongButton } from "./index";

const Login = () => {
  const { register } = useAuth();
  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    register({ username, password });
  };
  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} />
      </Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>
        注册
      </LongButton>
    </Form>
  );
};

export default Login;
