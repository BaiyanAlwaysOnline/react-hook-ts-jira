import { useAuth } from "./context/auth";
import { useHttp, useMount } from "./utils/hooks";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "./components/libs";
import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";

const AuthenticatedApp = () => {
  // const http = useHttp();
  // useMount(() => {
  //   http("projects", { token: user?.token });
  // });
  return (
    <Container>
      <PageHeader />
      <Main>main</Main>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftWareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button
              onClick={() => {
                logout();
                window.location.reload();
              }}
              type={"link"}
            >
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

export default AuthenticatedApp;
