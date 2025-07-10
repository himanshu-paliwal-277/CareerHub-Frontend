"use client";
import React, { memo, ReactNode } from "react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "@/store";
import AuthInitializer from "./AuthInitializer";
import { Notifications } from "@mantine/notifications";

interface IProps {
  children: ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <MantineProvider>
        <AuthInitializer>{children}</AuthInitializer>
        <Notifications />
      </MantineProvider>
    </Provider>
  );
};

export default memo(Providers);
