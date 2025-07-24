"use client";
import React, { memo } from "react";
import styles from "./dashboard.module.css";
import { Card, Flex } from "@mantine/core";
import StatusPieChart from "../dashboard-graphs/application-status-pie-chart/StatusPieChart";
import StatusHeatMap from "../dashboard-graphs/application-status-heatmap/StatusHeatMap";
import { useQuery } from "@tanstack/react-query";
import { getTotalCountOfCompany } from "@/services/getTotalCountOfCompany";
import { getTotalCountOfApplication } from "@/services/getTotalCountOfApplication";

const Dashboard: React.FC = () => {
  const { data: data1 } = useQuery({
    queryKey: ["getTotalCountOfCompany"],
    queryFn: () => getTotalCountOfCompany(),
  });

  const { data: data2 } = useQuery({
    queryKey: ["getTotalCountOfApplication"],
    queryFn: () => getTotalCountOfApplication(),
  });

  const totalCompanies = data1?.data?.totalCompanies || 0;
  const totalApplications = data2?.data?.totalApplications || 0;

  return (
    <>
      <StatusPieChart />
      <div className={styles.container}>
        <Flex
          className={styles.innerContainer}
          justify={"center"}
          gap={20}
          mb={25}
        >
          <Card withBorder>Total Companies: {totalCompanies}</Card>
          <Card withBorder>Total Applied Companies: {totalApplications}</Card>
          <Card withBorder>
            Total Not Applied Companies: {totalCompanies - totalApplications}
          </Card>
        </Flex>
      </div>
      <StatusHeatMap />
    </>
  );
};

export default memo(Dashboard);
