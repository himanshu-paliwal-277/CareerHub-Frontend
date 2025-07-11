"use client";
import React, { memo, ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "@/store";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProps {
  children: ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          {children}
          <Notifications />
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default memo(Providers);
