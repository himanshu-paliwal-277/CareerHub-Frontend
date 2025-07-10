"use client";
import React, { memo } from "react";
import styles from "./loginPage.module.css";
import { Button, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { loginFormValidationSchema } from "@/validation/loginValidationSchema";
import { yupResolver } from "mantine-form-yup-resolver";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/login";
import { useAppDispatch } from "@/store/hook";
import { loginSuccess } from "@/store/slices/authSlice";
import { notifications } from "@mantine/notifications";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: yupResolver(loginFormValidationSchema),
  });

  const handleSubmit = async () => {
    const response = await login(form.values);

    if (!response?.success || !response.data) {
      console.error("Login failed");
      notifications.show({
        title: "Login Failed",
        message: response?.message ?? "Login failed",
        color: "red",
      });
      return;
    }

    notifications.show({
      title: "Login Success",
      message: "You are logged in successfully",
      color: "green",
    });

    const { userId, name, email, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ id: userId, name, email }));

    dispatch(
      loginSuccess({
        user: {
          id: userId,
          name,
          email,
        },
        token,
      })
    );

    router.push("/companies");
  };

  return (
    <Paper radius="md" p="lg" withBorder className={styles.container}>
      <Text ta={"center"} mb={20} size="24px" fw={500}>
        Welcome
      </Text>

      <form
        className={styles.formContainer}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
          radius="md"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          radius="md"
          {...form.getInputProps("password")}
        />

        <Text mb={20}>
          {`Don't have an account? `}
          <Link href="/register">Register</Link>
        </Text>

        <Button w="100%" type="submit" radius="md">
          login
        </Button>
      </form>
    </Paper>
  );
};

export default memo(LoginPage);
