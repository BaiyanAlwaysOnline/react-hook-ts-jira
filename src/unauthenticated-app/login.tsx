import { useAuth } from "../context/auth";
import { Form, Input } from "antd";
import { LongButton } from "./index";

const Login = () => {
  const { login } = useAuth();
  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    login({ username, password });
  };
  return (
    <Form onFinish={onSubmit}>
      <Form.Item name="username">
        <Input placeholder={"用户名"} />
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder={"密码"} />
      </Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>
        登录
      </LongButton>
    </Form>
  );
};

export default Login;
