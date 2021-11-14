import { useAuth } from "./context/auth";
import AuthenticatedApp from "./authenticatedApp";
import UnAuthenticatedApp from "./unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
