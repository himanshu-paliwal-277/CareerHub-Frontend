"use client";
import React, { memo } from "react";
import styles from "./statusPieChart.module.css";
import { PieChart, type PieChartCell } from "@mantine/charts";
import { getApplicationCountOfAllStatus } from "@/services/getApplicationCountOfAllStatus";
import { useQuery } from "@tanstack/react-query";
import { MantineColor, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const StatusPieChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getApplicationCountOfAllStatus"],
    queryFn: getApplicationCountOfAllStatus,
  });

  const statusCounts = data?.data?.totalApplications || {};
  const mobile = useMediaQuery("(max-width: 768px)");

  const statusColors: Record<string, MantineColor> = {
    Applied: "indigo.6",
    Shortlisted: "yellow.6",
    Interview: "teal.6",
    Cleared: "blue.6",
    Offer: "green.6",
    Rejected: "red.6",
  };

  const pieChartData: PieChartCell[] = Object.entries(statusCounts)
    .filter(([, count]) => (count as number) > 0)
    .map(([status, count]) => ({
      name: status,
      value: Number(count),
      color: statusColors[status] || "gray.6",
    }));

  // if (pieChartData.length === 0) {
  //   return <div>No application data to show</div>;
  // }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Application Status</h2>
      {isLoading ? (
        <Skeleton
          mx={"auto"}
          visible={true}
          w={mobile ? 200 : 300}
          h={mobile ? 200 : 300}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <PieChart
          size={mobile ? 200 : 300}
          data={pieChartData}
          withTooltip
          tooltipDataSource="segment"
          mx="auto"
          withLabelsLine
          labelsPosition="inside"
          labelsType="value"
          withLabels
        />
      )}
    </div>
  );
};

export default memo(StatusPieChart);
