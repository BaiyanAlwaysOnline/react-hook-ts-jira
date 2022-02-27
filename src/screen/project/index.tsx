import { Link, Navigate, Route, Routes } from "react-router-dom";
import KanbanScreen from "../kanban";
import EpicScreen from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { useLocation } from "react-router";

const useRouteType = () => {
  const pathList = useLocation().pathname.split("/");
  return pathList[pathList.length - 1];
};

const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Menu mode={"inline"} selectedKeys={[routeType]}>
        <Menu.Item key={"kanban"}>
          <Link to={"kanban"}>kanban</Link> <br />
        </Menu.Item>
        <Menu.Item key={"epic"}>
          <Link to={"epic"}>epic</Link>
        </Menu.Item>
      </Menu>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route
          index
          element={
            <Navigate
              replace={true} // 代替掉记录栈中的最后一项
              to={window.location.pathname + "/kanban"}
            />
          }
        />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;

export default ProjectScreen;
