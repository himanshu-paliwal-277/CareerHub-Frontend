"use client";
import React, { memo, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "@/store";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsProvider } from "@mantine/modals";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  children: ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
      router.replace("/dashboard");
    }
  }, [path, router]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <ModalsProvider>{children}</ModalsProvider>
          <Notifications />
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default memo(Providers);
