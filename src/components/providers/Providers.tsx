"use client";

import React, { memo, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
// import { MantineProvider } from "@mantine/core";
// import { Notifications } from "@mantine/notifications";
// import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
        {/* <MantineProvider>
          <ModalsProvider>
            {children}
            <Notifications />
            </ModalsProvider>
            </MantineProvider> */}
        {children}
      </QueryClientProvider>
    </Provider>
  );
};

export default memo(Providers);
