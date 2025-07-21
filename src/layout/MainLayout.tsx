"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { memo, ReactNode, useEffect } from "react";
import styles from "./mainLayout.module.css";
import { getUserInfo } from "@/services/getUserInfo";

interface IProps {
  children: ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getUserInfoHandler = async () => {
    const response = await getUserInfo();
    if (response?.success) {
      const { name, email } = response.user;
      dispatch(loginSuccess({ user: { name, email } }));
      return;
    }
    console.error("User not found");
    router.push("/login");
  };

  useEffect(() => {
    getUserInfoHandler();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default memo(MainLayout);
