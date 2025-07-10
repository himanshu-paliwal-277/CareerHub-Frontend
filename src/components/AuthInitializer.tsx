"use client";
import React, { useEffect, ReactNode } from "react";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const AuthInitializer: React.FC<Props> = ({ children }) => {
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

  return <>{children}</>;
};

export default AuthInitializer;
