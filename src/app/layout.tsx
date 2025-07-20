import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import Providers from "@/components/providers/Providers";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

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
        <Providers>
          <MantineProvider>
            <ModalsProvider>
              {children}
              <Notifications />
            </ModalsProvider>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
