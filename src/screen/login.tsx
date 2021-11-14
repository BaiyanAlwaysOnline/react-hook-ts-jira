import { FormEvent } from "react";

const apiURL = process.env.REACT_APP_API_URL;
const Login = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    handleLogin({ username, password });
  };
  const handleLogin = (params: { username: string; password: string }) => {
    fetch(`${apiURL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
    }).then((res) => console.log(res));
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">用户名：</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码：</label>
        <input type="text" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};

export default Login;
