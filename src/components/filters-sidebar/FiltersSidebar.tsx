import React, { memo } from "react";
import styles from "./filtersSidebar.module.css";
import {
  Button,
  Card,
  Divider,
  Group,
  MultiSelect,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextInput,
} from "@mantine/core";

interface IProps {
  search: string;
  setSearch: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  tags: string[];
  setTags: (value: string[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const FiltersSidebar: React.FC<IProps> = ({
  search,
  setSearch,
  location,
  setLocation,
  tags,
  setTags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const handleReset = () => {
    setSearch("");
    setLocation("");
    setTags([]);
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return (
    <Card
      shadow="xs"
      padding="lg"
      radius="md"
      withBorder
      className={styles.filtersSection}
    >
      <Text fw={600} fz="xl">
        All Filters
      </Text>

      <Divider my="sm" />

      {/* Search */}
      <Text size="sm" mb={4}>
        Company
      </Text>
      <TextInput
        placeholder="Search company name"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />
      {/* <Autocomplete
        placeholder="Search company name"
        value={search}
        onChange={setSearch}
        mb="md"
        data={["Google", "Apple", "Microsoft", "Amazon", "Meta", "Tesla"]}
      /> */}

      {/* Location */}
      <Text size="sm" mb={4}>
        Location
      </Text>
      <Select
        placeholder="Select location"
        data={["Indore", "Ujjain", "Bhopal", "Remote"]}
        value={location}
        onChange={(value) => setLocation(value || "")}
        mb="md"
        clearable
      />

      {/* Tags */}
      <Text size="sm" mb={4}>
        Tags
      </Text>
      <MultiSelect
        placeholder="Select tags"
        data={[
          "FRONTEND",
          "BACKEND",
          "FULL STACK",
          "MERN",
          "SOFTWARE",
          "PRODUCT",
        ]}
        value={tags}
        onChange={setTags}
        mb="md"
        clearable
      />

      {/* Sort By */}
      <Text size="sm" mb={4}>
        Sort By
      </Text>
      <Select
        placeholder="Sort by"
        data={[
          { value: "createdAt", label: "Created At" },
          { value: "name", label: "Company Name" },
          { value: "location", label: "Location" },
        ]}
        value={sortBy}
        onChange={(value) => setSortBy(value || "createdAt")}
        mb="md"
      />

      {/* Sort Order */}
      <Text size="sm" mb={4}>
        Sort Order
      </Text>
      <RadioGroup value={sortOrder} onChange={setSortOrder} mb="md">
        <Group>
          <Radio value="asc" label="Ascending" />
          <Radio value="desc" label="Descending" />
        </Group>
      </RadioGroup>

      {/* Action Buttons */}
      <Group mt="lg">
        <Button variant="default" onClick={handleReset}>
          Reset
        </Button>
      </Group>
    </Card>
  );
};

export default memo(FiltersSidebar);
