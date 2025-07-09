import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
