import type { Metadata } from "next";
import "@mantine/core/styles.css";
import Providers from "@/components/Providers";
import "../globals.css";
import '@mantine/notifications/styles.css';

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
