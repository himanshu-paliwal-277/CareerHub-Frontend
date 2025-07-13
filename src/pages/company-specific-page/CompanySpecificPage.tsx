"use client";
import React, { memo } from "react";
import styles from "./companySpecificPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCompanyById } from "@/services/getCompanyById";
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
  Button,
} from "@mantine/core";
// import { IconPencil, IconUser } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { openCompanyModal } from "@/modals/openCompanyModal";

const CompanySpecificPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["getCompanyById", id], // include id to avoid caching issues
    queryFn: () => getCompanyById(id as string),
    enabled: !!id, // avoid fetching when id is undefined
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

  const company = data?.data || {};

  return (
    <Box p="40px">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.card}
        pos={"relative"}
      >
        <Button
          pos="absolute"
          top={20}
          right={20}
          w={30}
          h={30}
          p={0}
          bg={"transparent"}
          onClick={() => openCompanyModal("edit")}
        >
          {/* <IconPencil size={20} color="blue" /> */}
          edit
        </Button>
        <Stack gap="xs">
          <Text fz="28px" fw={700}>
            {company.name}
          </Text>

          <Text c="dimmed" size="sm">
            Location: {company.location}
          </Text>

          {company.contactPerson && (
            <Group gap="xs">
              {/* <IconUser size={16} /> */}
              <Text size="sm">Contact Person: {company.contactPerson}</Text>
            </Group>
          )}

          {company.description && (
            <>
              <Divider my="xs" />
              <Text size="sm">{company.description}</Text>
            </>
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
            Created By: {company.createdBy?.name}
          </Text>
          <Text size="xs" c="dimmed">
            Created At: {new Date(company.createdAt).toLocaleString()}
          </Text>
          <Text size="xs" c="dimmed">
            Updated At: {new Date(company.updatedAt).toLocaleString()}
          </Text>
        </Stack>
      </Card>
    </Box>
  );
};

export default memo(CompanySpecificPage);
