"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "@/services/getAllCompanies";
import React, { memo, useEffect, useRef } from "react";
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
import { useQueryParamsState } from "@/hooks/UseQueryParams";

interface IProps {
  defaultPage?: number;
  defaultSearch?: string;
  defaultLocation?: string;
  tags?: string;
  defaultApplicationStatus?: string;
  defaultSortBy?: string;
  defaultSortOrder?: string;
}

const CompaniesPage: React.FC<IProps> = ({
  defaultPage,
  defaultSearch,
  defaultLocation,
  defaultApplicationStatus,
  defaultSortBy,
  defaultSortOrder,
}) => {
  const {
    query: {
      page,
      search,
      location,
      tags,
      applicationStatus,
      sortBy,
      sortOrder,
    },
    setQueryParams,
  } = useQueryParamsState({
    page: defaultPage || 1,
    search: defaultSearch || "",
    location: defaultLocation || "",
    tags: "",
    applicationStatus: defaultApplicationStatus || "all",
    sortBy: defaultSortBy || "createdAt",
    sortOrder: defaultSortOrder || "desc",
  });

  const [debouncedSearch] = useDebouncedValue(search, 300);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // Skip the effect on first render
    }

    setQueryParams({ page: 1 });
  }, [debouncedSearch, location, tags, sortBy, sortOrder, applicationStatus]);

  const handleReset = () => {
    setQueryParams({
      page: 1,
      search: "",
      location: "",
      tags: "",
      applicationStatus: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "getAllCompanies",
      page,
      debouncedSearch,
      location,
      tags,
      applicationStatus,
      sortBy,
      sortOrder,
    ],
    queryFn: () => {
      return getAllCompanies(
        page,
        6,
        debouncedSearch,
        location,
        tags,
        applicationStatus,
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
      <Flex className={styles.header} align="center" pos={"relative"}>
        <Text w="100%" fz="32px" fw={700} ta="center">
          Companies
        </Text>
        <Button
          className={styles.createButton}
          onClick={() => openCompanyModal("create")}
        >
          Create
        </Button>
      </Flex>
      <Flex
        className={styles.mainContainer}
        mt="40px"
        gap={"36px"}
        align="start"
      >
        <FiltersSidebar
          search={search}
          setSearch={(value) => setQueryParams({ search: value })}
          location={location}
          setLocation={(value) => setQueryParams({ location: value })}
          tags={tags ? tags.split(",") : []}
          setTags={(value) => setQueryParams({ tags: value.join(",") })}
          applicationStatus={applicationStatus}
          setApplicationStatus={(value) =>
            setQueryParams({ applicationStatus: value })
          }
          sortBy={sortBy}
          setSortBy={(value) => setQueryParams({ sortBy: value })}
          sortOrder={sortOrder}
          setSortOrder={(value) => setQueryParams({ sortOrder: value })}
          handleReset={handleReset}
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
                key={page}
                value={Number(page)}
                onChange={(page) => setQueryParams({ page: page })}
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
