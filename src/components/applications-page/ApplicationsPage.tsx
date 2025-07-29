"use client";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useEffect, useRef } from "react";
import { Box, Center, Text, Flex, Pagination, Skeleton } from "@mantine/core";
import styles from "./applicationsPage.module.css";
import { getAllApplicationByUserId } from "@/services/getAllApplicationByUserId";
import { Application } from "@/types/apResponse";
import { applicationStatus } from "./data";
import ApplicationCard from "../application-card/ApplicationCard";
import { useQueryParamsState } from "@/hooks/UseQueryParams";

interface IProps {
  defaultPage?: number;
  defaultStatus?: string;
}

const ApplicationsPage: React.FC<IProps> = ({
  defaultPage = 1,
  defaultStatus = "All",
}) => {
  const hasMounted = useRef(false);
  const {
    query: { page, status },
    setQueryParams,
  } = useQueryParamsState({
    page: defaultPage || 1,
    status: defaultStatus || 1,
  });

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // Skip the effect on first render
    }
    setQueryParams({ page: 1 });
  }, [status]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllApplicationByUserId", page, status],
    queryFn: () => getAllApplicationByUserId(page, 8, status as string),
  });

  if (error instanceof Error)
    return (
      <Center h="70vh" w="100%">
        <Text c="red">Error: {error.message}</Text>
      </Center>
    );

  const applications = data?.data?.applications || [];

  return (
    <Box>
      <Flex align="center">
        <Text w="100%" fz="32px" fw={700} ta="center">
          Applications
        </Text>
      </Flex>
      <Flex
        className={styles.filtersBar}
        align="center"
        gap={20}
        mt={40}
        mb={30}
      >
        {applicationStatus.map((val, index) => (
          <button
            className={`${styles.statusChip} ${
              val === status ? styles.activeChip : ""
            }`}
            key={index ** 2}
            onClick={() => {
              setQueryParams({ status: val });
            }}
          >
            {val}
          </button>
        ))}
      </Flex>

      {isLoading && (
        <Box className={styles.applicationContainer}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index ** 2} width={"100%"} height={400} radius={8} />
          ))}
        </Box>
      )}

      {!isLoading && applications.length > 0 ? (
        <Box className={styles.applicationContainer}>
          {applications.map((application: Application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </Box>
      ) : (
        !isLoading && (
          <Center h="70vh" w="100%">
            <Text c="dimmed">No application found</Text>
          </Center>
        )
      )}

      <Flex justify="flex-end" mt={40}>
        {data?.data?.totalPage > 1 && (
          <Pagination
            total={data?.data?.totalPage || 1}
            value={page}
            onChange={(page) => setQueryParams({ page: page })}
            radius="xl"
          />
        )}
      </Flex>
    </Box>
  );
};

export default memo(ApplicationsPage);
