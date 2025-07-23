import ApplicationsPage from "@/components/applications-page/ApplicationsPage";

interface Props {
  searchParams: Promise<{
    page?: number;
    status?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const { status, page } = await searchParams;
  return <ApplicationsPage defaultPage={Number(page)} defaultStatus={status} />;
};

export default page;
