import { useAuth } from "./context/auth";
import AuthenticatedApp from "./authenticatedApp";
import UnAuthenticatedApp from "./unauthenticated-app";
import ErrBoundary from "./components/err-boundary";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrBoundary
        fallBackRender={(error) => <div>出错啦：{error.message}</div>}
      >
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrBoundary>
    </div>
  );
}

export default App;
