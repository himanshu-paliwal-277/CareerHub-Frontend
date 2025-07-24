"use client";
import React, { memo, ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

interface IProps {
  children: ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <ModalsProvider>
            {children}
            <Notifications />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default memo(Providers);
