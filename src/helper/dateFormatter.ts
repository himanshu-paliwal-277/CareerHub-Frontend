export function dateFormatter(dateStr: string): string {
  const date = new Date(dateStr);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate(); // e.g., 24
  const month = monthNames[date.getMonth()]; // e.g., July
  const year = date.getFullYear(); // e.g., 2025

  return `${day} ${month} ${year}`;
}
