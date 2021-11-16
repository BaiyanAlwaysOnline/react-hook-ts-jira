import { useAuth } from "../context/auth";
import { Button, Form, Input, Card } from "antd";

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
    <Card style={{ width: 400, height: 300 }}>
      <Form onFinish={onSubmit}>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input />
        </Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
