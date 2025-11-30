/** @format */

import { Table, Loader, Center, Text } from "@mantine/core";
import type { User } from "../api/useUsers";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}

export default function UsersTable({
  users,
  isLoading,
  isError,
}: UsersTableProps) {
  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center py="xl">
        <Text c="red">Could not load clients.</Text>
      </Center>
    );
  }

  if (!users.length) {
    return (
      <Center py="xl">
        <Text c="dimmed">No clients found.</Text>
      </Center>
    );
  }

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
