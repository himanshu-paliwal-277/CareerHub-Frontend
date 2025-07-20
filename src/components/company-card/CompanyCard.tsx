import React, { memo } from "react";
import styles from "./companyCard.module.css";
import companyIcon from "../../assets/icons/building.png";
import {
  Anchor,
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Company } from "@/types/apResponse";

interface IProps {
  company: Company;
  isApplied: boolean;
}

const CompanyCard: React.FC<IProps> = ({ company, isApplied }) => {
  const router = useRouter();

  return (
    <Card
      key={company._id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
      onClick={() => {
        router.push(`companies/${company._id}`);
      }}
    >
      <Stack gap="xs">
        {isApplied && <div className={styles.badge}>Applied</div>}
        <Box className={styles.companyIconContainer}>
          <Image
            className={styles.companyIcon}
            src={companyIcon}
            alt="company-icon"
            width={70}
            height={70}
          />
        </Box>
        <Text fw={600} fz="lg">
          {company.name}
        </Text>

        <Text c="dimmed" size="sm">
          Location: {company.location}
        </Text>

        {company.contactPerson && (
          <Group gap="xs">
            Contact Person:
            {/* <IconUser size={16} /> */}
            <Text size="sm">{company.contactPerson}</Text>
          </Group>
        )}

        <Group gap="xs" wrap="wrap">
          {company.tags?.map((tag: string) => (
            <Badge key={tag} color="blue" variant="light">
              {tag}
            </Badge>
          ))}
        </Group>

        <Group gap="sm" mt="xs">
          {company.website && (
            <Anchor
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </Anchor>
          )}
          {company.linkedin && (
            <Anchor
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Anchor>
          )}
        </Group>

        <Divider my="sm" />

        <Text size="xs" c="dimmed">
          Created By: {company.createdBy.name}
        </Text>
        <Text size="xs" c="dimmed">
          Created At: {new Date(company.createdAt).toLocaleString()}
        </Text>
        {/* <Text size="xs" c="dimmed">
          Updated At: {new Date(company.updatedAt).toLocaleString()}
        </Text> */}
      </Stack>
    </Card>
  );
};

export default memo(CompanyCard);
