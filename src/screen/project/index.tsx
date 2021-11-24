import { Link, Route, Routes } from "react-router-dom";
import KanbanScreen from "../kanban";
import EpicScreen from "../epic";

const ProjectScreen = () => {
  return (
    <div>
      <Link to={"kanban"}>kanban</Link> <br />
      <Link to={"epic"}>epic</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
