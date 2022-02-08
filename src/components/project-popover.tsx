import { Typography, Popover } from "antd";

export const ProjectPopover = () => {
  return (
    <Popover content={<Typography.Link>创建项目</Typography.Link>}>
      <h3>项目</h3>
    </Popover>
  );
};
