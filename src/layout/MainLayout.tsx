"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { memo, ReactNode, useEffect, useState } from "react";
import styles from "./mainLayout.module.css";
import { getUserInfo } from "@/services/getUserInfo";
import { Loader } from "@mantine/core";

interface IProps {
  children: ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const getUserInfoHandler = async () => {
    try {
      const response = await getUserInfo();
      if (response?.success) {
        const { name, email } = response.user;
        dispatch(loginSuccess({ user: { name, email } }));
      } else {
        console.error("User not found");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user info", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfoHandler();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader color="blue" size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default memo(MainLayout);
