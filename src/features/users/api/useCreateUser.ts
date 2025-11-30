/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { components } from "../../../lib/schema";
import type { User } from "./useUsers";

type NewUser = components["schemas"]["NewUser"];

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function postUser(payload: NewUser): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  const data = (await res.json()) as User;
  return data;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUser,
    onSuccess: (createdUser) => {
      // 🔥 keep /users list + existing-client select in sync
      queryClient.setQueryData<User[]>(["users"], (old) =>
        old ? [...old, createdUser] : [createdUser]
      );
    },
  });
}
