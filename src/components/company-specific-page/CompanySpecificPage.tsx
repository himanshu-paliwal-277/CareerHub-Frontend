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
  Flex,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { openCompanyModal } from "@/modals/companyModal/openCompanyModal";
import { openApplicationModal } from "@/modals/applicationModal/openApplicationModal";
import { getUserApplicationByCompany } from "@/services/getUserApplicationByCompany";
import { dateFormatter } from "@/helper/dateFormatter";
import { MdEdit } from "react-icons/md";

const CompanySpecificPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["getCompanyById", id], // include id to avoid caching issues
    queryFn: () => getCompanyById(id as string),
    enabled: !!id, // avoid fetching when id is undefined
  });

  const { data: applicationData } = useQuery({
    queryKey: ["getUserApplicationByCompany", id], // include id to avoid caching issues
    queryFn: () => getUserApplicationByCompany(id as string),
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
  const application = applicationData?.data || false;

  return (
    <Box>
      {/* company card */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.card}
        pos={"relative"}
        mb={{ sm: 40, base: 20 }}
        mt={{ sm: 0, base: 20 }}
      >
        <Button
          pos="absolute"
          top={{ xs: 20, base: 10 }}
          right={{ xs: 20, base: 10 }}
          w={30}
          h={30}
          p={0}
          bg={"transparent"}
          onClick={() => openCompanyModal("edit")}
        >
          <MdEdit color="#228be6" size={24} />
        </Button>
        <Stack gap="xs">
          <Text fz="28px" fw={700}>
            {company.name}
          </Text>

          <Text c="dimmed" size="sm">
            Location: {company.location}
          </Text>

          <Text c="dimmed" size="sm">
            Company Size: {company.companySize} employees
          </Text>

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

          {company.contactInfo && (
            <Box>
              <Text fw={500} size="sm" mb={4}>
                Contact Info:
              </Text>
              <Stack gap={2} pl="md">
                {company.contactInfo.mobile && (
                  <Text size="sm" c="dimmed">
                    Contact Person:{" "}
                    <Text span c="black">
                      {company.contactInfo.contactPerson}
                    </Text>
                  </Text>
                )}
                {company.contactInfo.mobile && (
                  <Text size="sm" c="dimmed">
                    Mobile:{" "}
                    <Text span c="black">
                      {company.contactInfo.mobile}
                    </Text>
                  </Text>
                )}
                {company.contactInfo.email && (
                  <Text size="sm" c="dimmed">
                    Email:{" "}
                    <Anchor
                      href={`mailto:${company.contactInfo.email}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {company.contactInfo.email}
                    </Anchor>
                  </Text>
                )}
                {company.contactInfo.linkedIn && (
                  <Text size="sm" c="dimmed">
                    LinkedIn:{" "}
                    <Anchor
                      href={company.contactInfo.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Profile
                    </Anchor>
                  </Text>
                )}
              </Stack>
            </Box>
          )}

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
      {/* application card */}
      {application ? (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={styles.card}
          pos={"relative"}
          mb={20}
        >
          <Button
            pos="absolute"
            top={{ xs: 20, base: 10 }}
            right={{ xs: 20, base: 10 }}
            w={30}
            h={30}
            p={0}
            bg={"transparent"}
            onClick={() => openApplicationModal("edit", "", application._id)}
          >
            <MdEdit color="#228be6" size={24} />
          </Button>
          <Stack gap="xs">
            <Text fz="28px" fw={700}>
              Application
            </Text>

            <Flex gap={8}>
              <Text c="dimmed" size="sm">
                Status:
              </Text>
              <Badge>{application?.status}</Badge>
            </Flex>

            <Text c="dimmed" size="sm">
              Application Date: {dateFormatter(application?.applicationDate)}
            </Text>

            <Text c="dimmed" size="sm">
              Notes: {application?.notes}
            </Text>

            <Divider my="sm" />
            <Text size="xs" c="dimmed">
              Updated At: {new Date(application?.updatedAt).toLocaleString()}
            </Text>
          </Stack>
        </Card>
      ) : (
        <div>
          <Button onClick={() => openApplicationModal("create", id as string)}>
            create
          </Button>
          <Flex w="100%" justify="center" align="center" h="30vh">
            <Text>no application found</Text>
          </Flex>
        </div>
      )}
    </Box>
  );
};

export default memo(CompanySpecificPage);
