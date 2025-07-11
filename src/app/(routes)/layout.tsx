import MainLayout from "@/layout/MainLayout";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MainLayout>{children}</MainLayout>;
};

export default RootLayout;
