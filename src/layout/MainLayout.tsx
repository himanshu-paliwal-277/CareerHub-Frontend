"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { memo, ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    if (token && userJson) {
      const user = JSON.parse(userJson);
      dispatch(loginSuccess({ user, token }));
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default memo(MainLayout);
