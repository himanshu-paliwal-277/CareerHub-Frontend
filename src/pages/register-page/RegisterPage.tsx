"use client";
import React, { memo } from "react";
import styles from "./registerPage.module.css";
import { Button, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { registerFormValidationSchema } from "@/validation/registerValidationSchema";
import Link from "next/link";
import { register } from "@/services/register";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: yupResolver(registerFormValidationSchema),
  });

  const onSubmit = async () => {
    const response = await register(form.values);
    if (!response?.success) {
      console.error("Register failed");
      notifications.show({
        title: "Register Failed",
        message: response?.message ?? "Register failed",
        color: "red",
      });
      return;
    }

    notifications.show({
      title: "Register Success",
      message: "You are registered successfully",
    });
    router.push("/login");
  };

  return (
    <Paper radius="md" p="lg" withBorder className={styles.container}>
      <Text ta={"center"} mb={20} size="24px" fw={500}>
        Welcome
      </Text>

      <form className={styles.formContainer} onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Name"
          placeholder="Your name"
          radius="md"
          {...form.getInputProps("name")}
        />

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
          {`Already have an account?`}
          <Link href="/login">Login</Link>
        </Text>

        <Button w="100%" type="submit" radius="md">
          register
        </Button>
      </form>
    </Paper>
  );
};

export default memo(RegisterPage);
