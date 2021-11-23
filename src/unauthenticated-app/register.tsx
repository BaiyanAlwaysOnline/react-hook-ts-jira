import { useAuth } from "context/auth";
import { Form, Input, message } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/useAsync";

const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { isLoading, run } = useAsync(undefined, { throwOnError: true });
  const onSubmit = async ({
    username,
    password,
    cpassword,
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== password) return message.error('两次密码输入不同，请重新再试！')
    try {
      await run(register({ username, password }));
    } catch(error) {
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} />
      </Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        注册
      </LongButton>
    </Form>
  );
};

export default Register;
