import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { SpinProps } from "antd/es/Spin";

// 通用Row组件，元素里面的内容竖直居中，可自定义margin
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom && props.marginBottom + "rem"};
  > * {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? `${props.gap}rem`
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export const FullLoadingPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const FullLoadingPage = (props: SpinProps) => (
  <FullLoadingPageWrapper>
    <Spin {...props} />
  </FullLoadingPageWrapper>
);

// 类型守卫 + duck类型
const isError = (value: any): value is Error => !!value?.message;
/**
 * @desc 接收任意类型，当是error类型时，返回ErrorComponent
 * @param error
 */
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
