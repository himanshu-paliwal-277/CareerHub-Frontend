import React, { memo } from "react";
import styles from "./filtersSidebar.module.css";
import {
  Button,
  Card,
  Divider,
  Flex,
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
  applicationStatus: string;
  setApplicationStatus: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  handleReset: () => void;
}

const FiltersSidebar: React.FC<IProps> = ({
  search,
  setSearch,
  location,
  setLocation,
  tags,
  setTags,
  applicationStatus,
  setApplicationStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  handleReset,
}) => {
  // const handleReset = () => {
  //   setSearch("");
  //   setLocation("");
  //   setTags([]);
  //   setApplicationStatus("all");
  //   setSortBy("createdAt");
  //   setSortOrder("desc");
  //   alert("reset");
  // };

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
          "SOFTWARE DEVELOPER",
        ]}
        value={tags}
        onChange={setTags}
        mb="md"
        clearable
      />

      {/* Application Status */}
      <Text size="sm" mb={4}>
        Application Status
      </Text>
      <RadioGroup
        value={applicationStatus}
        onChange={(value) => setApplicationStatus(value)}
        mb="md"
      >
        <Flex direction={"column"} gap={16} mt="sm">
          <Radio value="all" label="All" />
          <Radio value="applied" label="Applied" />
          <Radio value="notApplied" label="Not Applied" />
        </Flex>
      </RadioGroup>

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
