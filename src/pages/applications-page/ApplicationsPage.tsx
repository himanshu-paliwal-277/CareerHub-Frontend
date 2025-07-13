"use client";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useState } from "react";
import {
  Box,
  Center,
  Loader,
  Text,
  Card,
  Stack,
  Flex,
  Badge,
  Divider,
  Group,
  Paper,
  Pagination,
} from "@mantine/core";
import styles from "./applicationsPage.module.css";
import applicationIcon from "../../assets/icons/application.png";
import Image from "next/image";
import { getAllApplicationByUserId } from "@/services/getAllApplicationByUserId";
import { Application } from "@/types/apResponse";

const ApplicationsPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllApplicationByUserId", page],
    queryFn: () => getAllApplicationByUserId(page, 4),
  });

  if (isLoading)
    return (
      <Center h="70vh" w="100%">
        <Loader type="dots" color="blue" />
      </Center>
    );

  if (error instanceof Error)
    return (
      <Center h="70vh" w="100%">
        <Text c="red">Error: {error.message}</Text>
      </Center>
    );

  const applications = data?.data?.applications || [];

  return (
    <Box p="40px">
      <Flex align="center">
        <Text w="100%" fz="32px" fw={700} ta="center">
          Applications
        </Text>
      </Flex>

      <Box className={styles.applicationContainer} mt="40px">
        {applications.map((application: Application) => (
          <Card
            key={application._id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.card}
          >
            <Stack gap="xs">
              {/* Icon */}
              <Box className={styles.applicationIconContainer}>
                <Image
                  className={styles.applicationIcon}
                  src={applicationIcon}
                  alt="application-icon"
                  width={70}
                  height={70}
                />
              </Box>

              {/* Status */}
              <Group justify="space-between" align="center">
                <Text fw={600} fz="lg">
                  Status:
                </Text>
                <Badge color="blue" variant="light">
                  {application.status}
                </Badge>
              </Group>

              {/* Company Name */}
              {application.company?.name && (
                <Group justify="space-between" align="center">
                  <Text fw={600}>Company:</Text>
                  <Text>{application.company.name}</Text>
                </Group>
              )}

              {/* Application Date */}
              {application.applicationDate && (
                <Group justify="space-between" align="center">
                  <Text fw={600}>Application Date:</Text>
                  <Text>
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </Text>
                </Group>
              )}

              {/* Notes */}
              {application.notes && (
                <Box>
                  <Text fw={600}>Notes:</Text>
                  <Paper radius="sm" bg={"#eeeeeeff"} p="10px" mih={"75px"}>
                    <Text>{application.notes}</Text>
                  </Paper>
                </Box>
              )}

              {/* Created At */}
              <Group justify="space-between" align="center">
                <Text fw={600}>Created At:</Text>
                <Text size="sm" c="dimmed">
                  {new Date(application.createdAt).toLocaleString()}
                </Text>
              </Group>

              {/* Updated At */}
              <Group justify="space-between" align="center">
                <Text fw={600}>Updated At:</Text>
                <Text size="sm" c="dimmed">
                  {new Date(application.updatedAt).toLocaleString()}
                </Text>
              </Group>

              <Divider my="sm" />

              {/* User Id */}
              <Group justify="space-between" align="center">
                <Text fw={600}>User Id:</Text>
                <Text size="xs" c="dimmed">
                  {application.user}
                </Text>
              </Group>

              {/* Application Id */}
              <Group justify="space-between" align="center">
                <Text fw={600}>Application Id:</Text>
                <Text size="xs" c="dimmed">
                  {application._id}
                </Text>
              </Group>
            </Stack>
          </Card>
        ))}
      </Box>

      <Flex justify="flex-end" mt={40}>
        <Pagination
          total={data?.data?.totalPage || 1}
          value={page}
          onChange={setPage}
          mt="sm"
        />
      </Flex>
    </Box>
  );
};

export default memo(ApplicationsPage);
