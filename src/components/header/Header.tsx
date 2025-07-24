"use client";
import {
  Avatar,
  Button,
  Drawer,
  Flex,
  Group,
  Menu,
  MenuDropdown,
  MenuTarget,
  Text,
} from "@mantine/core";
import { FiMenu } from "react-icons/fi";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout } from "@/store/slices/authSlice";
import { notifications } from "@mantine/notifications";
import { memo } from "react";
import { logoutAPI } from "@/services/logout";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ current route
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const mobile = useMediaQuery("(max-width: 768px)");

  const logoutUser = async () => {
    try {
      const response = await logoutAPI(); // should be an Axios instance call

      if (response.success) {
        console.log("Logout successful");
        router.push("/login");
        dispatch(logout());
        notifications.show({
          title: "Logout Success",
          message: response.message, // ✅ fixed this
          color: "green",
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      notifications.show({
        title: "Something went wrong",
        message: "logout failed",
        color: "red",
      });
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      <header className={styles.header}>
        <Group justify="space-between" h="100%">
          <Image
            className={styles.logoImage}
            src={logo}
            alt="logo"
            width={180}
            height={65}
          />

          {!mobile && (
            <Group gap={20}>
              <Link
                href="/"
                className={`${styles.link} ${
                  pathname === "/" ? styles.activeLink : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/companies"
                className={`${styles.link} ${
                  pathname === "/companies" ? styles.activeLink : ""
                }`}
              >
                Companies
              </Link>
              <Link
                href="/applications"
                className={`${styles.link} ${
                  pathname === "/applications" ? styles.activeLink : ""
                }`}
              >
                Applications
              </Link>
              <Link
                href="/dashboard"
                className={`${styles.link} ${
                  pathname === "/dashboard" ? styles.activeLink : ""
                }`}
              >
                Dashboard
              </Link>
            </Group>
          )}

          {isAuthenticated ? (
            <Flex className={styles.userMenu} align="center" gap={12}>
              {!mobile ? (
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
              ) : (
                <Button variant="transparent" p="0px" onClick={open}>
                  <FiMenu size={24} />
                </Button>
              )}
            </Flex>
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
      <Drawer opened={opened} onClose={close} position={"right"}>
        <Flex direction={"column"} align="center">
          <Avatar size={"60px"} color="cyan" radius="xl">
            {user?.name.charAt(0)}
          </Avatar>
          <Text mt={10} fz={"lg"} fw={500}>
            {user?.name}
          </Text>
          <Text c={"dimmed"}>{user?.email}</Text>

          <Flex direction={"column"} align="center" my={20} gap={10}>
            <Link
              href="/"
              className={`${styles.link} ${
                pathname === "/" ? styles.activeLink : ""
              }`}
              onClick={close}
            >
              Home
            </Link>
            <Link
              href="/companies"
              className={`${styles.link} ${
                pathname === "/companies" ? styles.activeLink : ""
              }`}
              onClick={close}
            >
              Companies
            </Link>
            <Link
              href="/applications"
              className={`${styles.link} ${
                pathname === "/applications" ? styles.activeLink : ""
              }`}
              onClick={close}
            >
              Applications
            </Link>
            <Link
              href="/dashboard"
              className={`${styles.link} ${
                pathname === "/dashboard" ? styles.activeLink : ""
              }`}
            >
              Dashboard
            </Link>
          </Flex>

          <Button mt={12} onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Drawer>
    </>
  );
};

export default memo(Header);
