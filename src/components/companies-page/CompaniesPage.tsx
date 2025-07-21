"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "@/services/getAllCompanies";
import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  Button,
  Flex,
  Pagination,
  Skeleton,
} from "@mantine/core";
import styles from "./companiesPage.module.css";
import { Company } from "@/types/apResponse";
import { openCompanyModal } from "@/modals/companyModal/openCompanyModal";
import FiltersSidebar from "../filters-sidebar/FiltersSidebar";
import CompanyCard from "../company-card/CompanyCard";
import { useDebouncedValue } from "@mantine/hooks";

const CompaniesPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, location, tags, sortBy, sortOrder]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "getAllCompanies",
      page,
      debouncedSearch,
      location,
      tags,
      sortBy,
      sortOrder,
    ],
    queryFn: () => {
      const tagsString = tags.join(",");
      return getAllCompanies(
        page,
        6,
        search,
        location,
        tagsString,
        sortBy,
        sortOrder
      );
    },
  });

  if (error instanceof Error)
    return (
      <Center h="70vh" w="100%">
        <Text c="red">Error: {error.message}</Text>
      </Center>
    );

  const companies = data?.data?.companies || [];

  return (
    <Box>
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
      <Flex mt="40px" gap={"36px"} align="start">
        <FiltersSidebar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          tags={tags}
          setTags={setTags}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <Box w={"100%"}>
          {isLoading && (
            <Box className={styles.companyContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index ** 2}
                  width={"100%"}
                  height={400}
                  radius={8}
                />
              ))}
            </Box>
          )}
          {!isLoading && companies.length > 0 ? (
            <Box className={styles.companyContainer}>
              {companies.map((company: Company) => (
                <CompanyCard
                  key={company._id}
                  company={company}
                  isApplied={company?.isApplied || false}
                />
              ))}
            </Box>
          ) : (
            !isLoading && (
              <Center h="70vh" w="100%">
                <Text c="dimmed">No companies found</Text>
              </Center>
            )
          )}
          <Flex justify="flex-end" mt={40}>
            {data?.data?.totalPage > 1 && (
              <Pagination
                value={page}
                onChange={setPage}
                total={data?.data?.totalPage || 1}
                radius="xl"
              />
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(CompaniesPage);
