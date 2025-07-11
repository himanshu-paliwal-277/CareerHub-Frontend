"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "@/services/getAllCompanies";
import React, { memo } from "react";
import {
  Box,
  Center,
  Loader,
  Text,
  Card,
  Group,
  Badge,
  Anchor,
  Stack,
  Divider,
} from "@mantine/core";
import styles from "./companyPage.module.css";
import { IconUser } from "@tabler/icons-react";

const CompanyPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllCompanies"],
    queryFn: getAllCompanies,
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

  const companies = data?.data?.companies || [];

  return (
    <Box p="40px">
      <Text fz="32px" fw={700} ta="center" mb="40px">
        Companies
      </Text>
      <Box className={styles.companyContainer}>
        {companies.map((company: any) => (
          <Card
            key={company._id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.card}
          >
            <Stack gap="xs">
              <Text fw={600} fz="lg">
                {company.name}
              </Text>

              <Text c="dimmed" size="sm">
                Location: {company.location}
              </Text>

              {company.contactPerson && (
                <Group gap="xs">
                  Contact Person:
                  <IconUser size={16} />
                  <Text size="sm">{company.contactPerson}</Text>
                </Group>
              )}

              <Group gap="xs" wrap="wrap">
                {company.tags?.map((tag: string) => (
                  <Badge key={tag} color="blue" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Group gap="sm" mt="xs">
                {company.website && (
                  <Anchor
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </Anchor>
                )}
                {company.linkedin && (
                  <Anchor
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Anchor>
                )}
              </Group>

              <Divider my="sm" />

              <Text size="xs" c="dimmed">
                Created By: {company.createdBy.name}
              </Text>
              <Text size="xs" c="dimmed">
                Created At: {new Date(company.createdAt).toLocaleString()}
              </Text>
              <Text size="xs" c="dimmed">
                Updated At: {new Date(company.updatedAt).toLocaleString()}
              </Text>
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default memo(CompanyPage);
