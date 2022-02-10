import { QueryClientProvider, QueryClient } from "react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
const client = new QueryClient();
const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default AppProvider;
