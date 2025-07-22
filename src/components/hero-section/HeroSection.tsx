"use client";
import React, { memo } from "react";
import styles from "./heroSection.module.css";
import { useQuery } from "@tanstack/react-query";
import { getTotalCountOfCompany } from "@/services/getTotalCountOfCompany";
import { getTotalCountOfApplication } from "@/services/getTotalCountOfApplication";
import { Skeleton } from "@mantine/core";

const headingMapper: Record<string, string> = {
  totalCompanies: "Total Companies",
  totalApplications: "Total Applications",
  // totalCleared: "Total Interview Cleared",
  totalCleared: "Total Interview",
};

const HeroSection: React.FC = () => {
  const { data: data1, isLoading: loading1 } = useQuery({
    queryKey: ["getTotalCountOfCompany"],
    queryFn: () => getTotalCountOfCompany(),
  });

  const { data: data2, isLoading: loading2 } = useQuery({
    queryKey: ["getTotalCountOfApplication"],
    queryFn: () => getTotalCountOfApplication(),
  });

  const { data: data3, isLoading: loading3 } = useQuery({
    queryKey: ["getTotalCountOfApplication2"],
    queryFn: () =>
      getTotalCountOfApplication(["Interview", "Cleared", "Offer"].join(",")),
  });

  const data = {
    totalCompanies: data1?.data?.totalCompanies || 0,
    totalApplications: data2?.data?.totalApplications || 0,
    totalCleared: data3?.data?.totalApplications || 0,
  };

  const isLoading = loading1 || loading2 || loading3;

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Welcome to Career Hub</h1>
        <p className={styles.description}>
          Your one-stop solution for managing job applications and company data.
        </p>
        <p className={styles.description}>
          Track your applications, manage companies, and stay organized in your
          job search.
        </p>
      </div>
      {!isLoading ? (
        <div className={styles.gridContainer}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles.stat}>
              <h2 className={styles.statValue}>{value}</h2>
              <h3 className={styles.statLabel}>{headingMapper[key]}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index ** 2} width={"100%"} height={104} radius={8} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(HeroSection);
