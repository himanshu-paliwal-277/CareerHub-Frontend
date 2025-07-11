import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import "@mantine/notifications/styles.css";
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
