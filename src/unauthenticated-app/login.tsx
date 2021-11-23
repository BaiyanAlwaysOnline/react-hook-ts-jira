import { useAuth } from "context/auth";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/useAsync";

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { isLoading, run } = useAsync(undefined, { throwOnError: true });
  const onSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      // ? 登录成功后，登录页销毁，然后才设置loading 故导致React控制台报错
      await run(login({ username, password }));
    } catch (error) {
      onError(error as Error);
    }
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
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        登录
      </LongButton>
    </Form>
  );
};

export default Login;
