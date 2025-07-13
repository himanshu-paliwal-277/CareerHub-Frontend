"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "@/services/getAllCompanies";
import React, { memo, useState } from "react";
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
  Pagination,
} from "@mantine/core";
import styles from "./companiesPage.module.css";
// import { IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import companyIcon from "../../assets/icons/building.png";
import Image from "next/image";
import { Company } from "@/types/apResponse";
import { openCompanyModal } from "@/modals/companyModal/openCompanyModal";

const CompaniesPage: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllCompanies", page],
    queryFn: () => getAllCompanies(page, 4),
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
      <Flex align="center" pos={"relative"}>
        <Text w="100%" fz="32px" fw={700} ta="center">
          Companies
        </Text>
        <Button
          pos="absolute"
          right="0"
          onClick={() => openCompanyModal("create")}
        >
          Create
        </Button>
      </Flex>
      <Box className={styles.companyContainer} mt="40px">
        {companies.map((company: Company) => (
          <Card
            key={company._id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.card}
            onClick={() => {
              router.push(`companies/${company._id}`);
            }}
          >
            <Stack gap="xs">
              <Box className={styles.companyIconContainer}>
                <Image
                  className={styles.companyIcon}
                  src={companyIcon}
                  alt="company-icon"
                  width={70}
                  height={70}
                />
              </Box>
              <Text fw={600} fz="lg">
                {company.name}
              </Text>

              <Text c="dimmed" size="sm">
                Location: {company.location}
              </Text>

              {company.contactPerson && (
                <Group gap="xs">
                  Contact Person:
                  {/* <IconUser size={16} /> */}
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
              {/* <Text size="xs" c="dimmed">
                Updated At: {new Date(company.updatedAt).toLocaleString()}
              </Text> */}
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

export default memo(CompaniesPage);
