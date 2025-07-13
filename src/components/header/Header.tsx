"use client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  MenuDropdown,
  MenuTarget,
  Text,
} from "@mantine/core";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout } from "@/store/slices/authSlice";
import { notifications } from "@mantine/notifications";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
    <header className={styles.header}>
      <Group justify="space-between" h="100%">
        <Image
          className={styles.logoImage}
          src={logo}
          alt="logo"
          width={180}
          height={65}
        />

        <Group gap={20}>
          <Link href="/dashboard" className={styles.link}>
            Home
          </Link>
          <Link href="/companies" className={styles.link}>
            Companies
          </Link>
          <Link href="/applications" className={styles.link}>
            Applications
          </Link>
        </Group>

        {isAuthenticated ? (
          <Box ml={80}>
            <Menu
              shadow="md"
              trigger="hover"
              openDelay={100}
              closeDelay={400}
              width={200}
            >
              <MenuTarget>
                <Avatar size={"44px"} color="cyan" radius="xl">
                  {user?.name.charAt(0)}
                </Avatar>
              </MenuTarget>

              <MenuDropdown p="16px">
                <Flex direction={"column"} align="center">
                  <Avatar size={"60px"} color="cyan" radius="xl">
                    {user?.name.charAt(0)}
                  </Avatar>
                  <Text mt={10} fz={"lg"} fw={500}>
                    {user?.name}
                  </Text>
                  <Text c={"dimmed"}>{user?.email}</Text>

                  <Button mt={12} onClick={handleLogout}>
                    Logout
                  </Button>
                </Flex>
              </MenuDropdown>
            </Menu>
          </Box>
        ) : (
          <Group visibleFrom="sm">
            <Button variant="default" onClick={() => router.push("/login")}>
              Log in
            </Button>
            <Button onClick={() => router.push("/register")}>Register</Button>
          </Group>
        )}
      </Group>
    </header>
  );
};

export default Header;
