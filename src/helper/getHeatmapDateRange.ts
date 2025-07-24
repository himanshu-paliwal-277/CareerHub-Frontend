import dayjs from "dayjs";

export const getHeatmapDateRange = (year: number) => {
  const now = dayjs();
  const currentYear = now.year();

  if (year === currentYear) {
    const end = now;
    const start = end.subtract(1, "year");
    return {
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
    };
  } else {
    // Full calendar year for previous years
    const start = dayjs(`${year}-01-01`);
    const end = dayjs(`${year}-12-31`);
    return {
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
    };
  }
};
