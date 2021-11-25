import { useAuth } from "./context/auth";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "./components/libs";
import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";
import ProjectListScreen from "./screen/project-list";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import ProjectScreen from "./screen/project";
import { resetRoute } from "./utils/utils";

// react-router和react-router-dom的关系就像
// react和react-dom或者react-native的关系。前者时处理核心逻辑，后两个和不同宿主关系强关联，使用不同宿主环境的api，消费react算出的结果

const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route index element={<Navigate to="/projects" />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftWareLogo
          onClick={resetRoute}
          width={"18rem"}
          cursor={"pointer"}
          color={"rgb(38, 132, 255)"}
        />
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
            <Button onClick={() => logout()} type={"link"}>
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
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default AuthenticatedApp;
