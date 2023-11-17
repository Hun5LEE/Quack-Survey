"use client";

import { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "@/store/store";

// import "sfac-designkit-react/style.css";

const Provider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </QueryClientProvider>
  );
};

export default Provider;
