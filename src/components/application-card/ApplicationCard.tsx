import React, { memo } from "react";
import styles from "./applicationCard.module.css";
import applicationIcon from "../../assets/icons/application.png";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { Application } from "@/types/apResponse";
import { MdEdit } from "react-icons/md";
import { openApplicationModal } from "@/modals/applicationModal/openApplicationModal";

interface IProps {
  application: Application;
}

const ApplicationCard: React.FC<IProps> = ({ application }) => {
  return (
    <Card
      key={application._id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
    >
      <Button
        pos="absolute"
        top={12}
        right={12}
        w={30}
        h={30}
        p={0}
        bg={"transparent"}
        onClick={() => openApplicationModal("edit", "", application._id)}
      >
        <MdEdit color="#228be6" size={20} />
      </Button>
      <Stack gap="xs">
        {/* Icon */}
        <Box>
          <Image
            src={applicationIcon}
            alt="application-icon"
            width={70}
            height={70}
          />
        </Box>

        {/* Status */}
        <Group justify="space-between" align="center">
          <Text fw={600} fz="lg">
            Status:
          </Text>
          <Badge color="blue" variant="light">
            {application.status}
          </Badge>
        </Group>

        {/* Company Name */}
        {application.company?.name && (
          <Group justify="space-between" align="center">
            <Text fw={600}>Company:</Text>
            <Text>{application.company.name}</Text>
          </Group>
        )}

        {/* Application Date */}
        {application.applicationDate && (
          <Group justify="space-between" align="center">
            <Text fw={600}>Application Date:</Text>
            <Text>
              {new Date(application.applicationDate).toLocaleDateString()}
            </Text>
          </Group>
        )}

        {/* Notes */}
        {application.notes && (
          <Box>
            <Text fw={600}>Notes:</Text>
            <Paper radius="sm" bg={"#eeeeeeff"} p="10px" mih={"75px"}>
              <Text>{application.notes}</Text>
            </Paper>
          </Box>
        )}

        {/* Created At */}
        <Group justify="space-between" align="center">
          <Text fw={600}>Created At:</Text>
          <Text size="sm" c="dimmed">
            {new Date(application.createdAt).toLocaleString()}
          </Text>
        </Group>

        {/* Updated At */}
        <Group justify="space-between" align="center">
          <Text fw={600}>Updated At:</Text>
          <Text size="sm" c="dimmed">
            {new Date(application.updatedAt).toLocaleString()}
          </Text>
        </Group>

        <Divider my="sm" />

        {/* User Id */}
        <Group justify="space-between" align="center">
          <Text fw={600}>User Id:</Text>
          <Text size="xs" c="dimmed">
            {application.user}
          </Text>
        </Group>

        {/* Application Id */}
        <Group justify="space-between" align="center">
          <Text fw={600}>Application Id:</Text>
          <Text size="xs" c="dimmed">
            {application._id}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default memo(ApplicationCard);
