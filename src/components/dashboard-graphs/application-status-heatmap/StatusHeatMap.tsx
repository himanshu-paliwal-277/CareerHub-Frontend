"use client";
import React, { memo, useState } from "react";
import styles from "./statusHeatMap.module.css";
import { Heatmap } from "@mantine/charts";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getDailyApplicationCounts } from "@/services/getDailyApplicationCounts";
import { getHeatmapDateRange } from "@/helper/getHeatmapDateRange";
import { Flex, Skeleton, Text } from "@mantine/core";

const StatusHeatMap: React.FC = () => {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { startDate, endDate } = getHeatmapDateRange(selectedYear);

  const { data, isLoading } = useQuery({
    queryKey: ["getDailyApplicationCounts", startDate, endDate],
    queryFn: () => getDailyApplicationCounts(startDate, endDate),
  });

  const heatMapData = data?.data || {};

  const totalApplicationCountInYear = Object.values(heatMapData).reduce(
    (acc, value) => Number(acc) + Number(value),
    0
  );

  const handleYearChange = (year: number) => setSelectedYear(year);

  return (
    <div className={styles.container}>
      <div>
        <Text mb={10} className={styles.title}>
          {Number(totalApplicationCountInYear)} Application last year
        </Text>
        <Flex gap={30}>
          {isLoading ? (
            <Skeleton visible={true} w={655.6} h={132.2} />
          ) : (
            <div className={styles.heatMapContainer}>
              <Heatmap
                className={styles.heatMap}
                data={heatMapData}
                startDate={startDate}
                endDate={endDate}
                withTooltip
                withWeekdayLabels
                withMonthLabels
                getTooltipLabel={({ date, value }) =>
                  `${dayjs(date).format("DD MMM, YYYY")} – ${
                    value === null || value === 0
                      ? "No contributions"
                      : `${value} contribution${value > 1 ? "s" : ""}`
                  }`
                }
              />
            </div>
          )}

          <div className={styles.yearSelector}>
            {[2023, 2024, 2025].map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`${styles.button} ${
                  selectedYear === year ? styles.activeYear : ""
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default memo(StatusHeatMap);
