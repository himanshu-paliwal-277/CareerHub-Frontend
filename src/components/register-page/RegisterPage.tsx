"use client";
import React, { memo } from "react";
import styles from "../login-page/loginPage.module.css";
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
    <div className={styles.container}>
      <Paper radius="md" p="lg" withBorder className={styles.innerContainer}>
        <Text ta={"center"} mb={20} size="24px" fw={500}>
          Welcome
        </Text>

        <form
          className={styles.formContainer}
          onSubmit={form.onSubmit(onSubmit)}
        >
          <TextInput
            classNames={{
              label: styles.label,
            }}
            label="Name"
            placeholder="Your name"
            radius="sm"
            {...form.getInputProps("name")}
          />

          <TextInput
            classNames={{
              label: styles.label,
            }}
            label="Email"
            placeholder="hello@mantine.dev"
            radius="sm"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            classNames={{
              label: styles.label,
            }}
            label="Password"
            placeholder="Your password"
            radius="sm"
            {...form.getInputProps("password")}
          />

          <Text mb={20}>
            {`Already have an account? `}
            <Link className={styles.link} href="/login">
              Login
            </Link>
          </Text>

          <Button w="100%" type="submit" radius="sm">
            register
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default memo(RegisterPage);
