import { QueryClientProvider, QueryClient } from "react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
