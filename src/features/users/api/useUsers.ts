/** @format */

import { useQuery } from "@tanstack/react-query";
import type { components, operations } from "../../../lib/schema";

export type User = components["schemas"]["User"];

type GetUsersResponse =
  operations["getUsers"]["responses"][200]["content"]["application/json"];

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchUsers(): Promise<GetUsersResponse> {
  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = (await res.json()) as GetUsersResponse;

  return data;
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
