import CompaniesPage from "@/components/companies-page/CompaniesPage";

interface Props {
  searchParams: Promise<{
    page?: number;
    search?: string;
    location?: string;
    applicationStatus?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const { page, search, location, applicationStatus, sortBy, sortOrder } =
    await searchParams;
  return (
    <CompaniesPage
      defaultPage={page}
      defaultSearch={search}
      defaultLocation={location}
      defaultApplicationStatus={applicationStatus}
      defaultSortBy={sortBy}
      defaultSortOrder={sortOrder}
    />
  );
};

export default page;
