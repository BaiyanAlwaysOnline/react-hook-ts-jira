import React, { ReactElement } from "react";

class ErrBoundary extends React.Component<
  React.PropsWithChildren<{ fallBackRender: (error: Error) => ReactElement }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  // 当组件树中有组件抛出了异常，这个方法会触发执行，赋值给state.error
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // 只能获取到渲染过程错误，合成事件主动触发的错误无法捕获
  render() {
    const { error } = this.state;
    const { fallBackRender, children } = this.props;
    if (error) return fallBackRender(error);
    return children;
  }
}

export default ErrBoundary;
