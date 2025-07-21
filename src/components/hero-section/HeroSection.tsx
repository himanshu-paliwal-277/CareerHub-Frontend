"use client";
import React, { memo } from "react";
import styles from "./heroSection.module.css";
import { useQuery } from "@tanstack/react-query";
import { getTotalCountOfCompany } from "@/services/getTotalCountOfCompany";
import { getTotalCountOfApplication } from "@/services/getTotalCountOfApplication";
import { Flex } from "@mantine/core";

const HeroSection: React.FC = () => {
  const { data: data1, isLoading: loading1 } = useQuery({
    queryKey: ["getTotalCountOfCompany"],
    queryFn: () => getTotalCountOfCompany(),
  });

  const { data: data2, isLoading: loading2 } = useQuery({
    queryKey: ["getTotalCountOfApplication"],
    queryFn: () => getTotalCountOfApplication(),
  });

  const totalCompanies = data1?.data?.totalCompanies || 0;
  const totalApplications = data2?.data?.totalApplications || 0;
  const isLoading = loading1 || loading2;

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <Flex align={"center"} gap={20}>
          <div>total companies: {totalCompanies}</div>
          <div>total applications: {totalApplications}</div>
        </Flex>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default memo(HeroSection);
