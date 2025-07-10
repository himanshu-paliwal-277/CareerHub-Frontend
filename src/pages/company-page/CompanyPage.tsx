"use client";
import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const CompanyPage: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
    notifications.show({
      title: "Logout Success",
      message: "You are logged out successfully",
      color: "green",
    });
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>ID: {user?.id}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default memo(CompanyPage);
