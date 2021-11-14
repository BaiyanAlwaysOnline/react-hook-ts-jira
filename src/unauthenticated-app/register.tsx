import { FormEvent } from "react";
import { useAuth } from "../context/auth";

const Register = () => {
  const { register } = useAuth();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">用户名：</label>
          <input type="text" id={"username"} />
        </div>
        <div>
          <label htmlFor="password">密码：</label>
          <input type="text" id={"password"} />
        </div>
        <button type={"submit"}>注册</button>
      </form>
    </>
  );
};

export default Register;
