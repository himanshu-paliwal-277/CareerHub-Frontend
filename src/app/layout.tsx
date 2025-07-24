import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "CareerHub",
  description: "careerHub is a job portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
