import { useEffect, useState } from "react";
import Search from "./search";
import List from "./list";
import styled from "@emotion/styled";
import { useDebounce, useHttp, useMount } from "utils/hooks";
import { User } from "types/user";
import { Project } from "types/projects";

const ProjectListIndex = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [listData, setListData] = useState<Project[] | []>([]);
  const [userData, setUserData] = useState<User[] | []>([]);
  const debouncedValue = useDebounce(param, 200);
  const request = useHttp();
  useMount(() => {
    request("users").then(setUserData);
  });
  useEffect(() => {
    request("projects", { data: param }).then(setListData);
  }, [debouncedValue]);

  return (
    <Container>
      <h1>项目列表</h1>
      <Search param={param} setParam={setParam} users={userData} />
      <List dataSource={listData} users={userData} />
    </Container>
  );
};

const Container = styled.div`
  //width: 100%;
  //height: 100%;
  //background-color: #e1dede;
  padding: 3.2rem;
`;

export default ProjectListIndex;
