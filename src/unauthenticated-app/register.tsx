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
      <Form.Item name="username">
        <Input placeholder={"用户名"} />
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder={"密码"} />
      </Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>
        注册
      </LongButton>
    </Form>
  );
};

export default Login;
