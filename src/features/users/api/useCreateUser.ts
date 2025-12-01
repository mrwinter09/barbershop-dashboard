/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { components } from "../../../lib/schema";
import type { UserFormValues } from "../validation/userSchema";

type User = components["schemas"]["User"];

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function createUser(values: UserFormValues): Promise<User> {
  const payload = {
    name: values.name,
    username: values.username,
    email: values.email,
    phone: values.phone,
    website: values.website,
    ...(values.street || values.city || values.zipcode
      ? {
          address: {
            street: values.street,
            city: values.city,
            zipcode: values.zipcode,
          },
        }
      : {}),
  };

  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(["users"], (old) =>
        old ? [...old, newUser] : [newUser]
      );
    },
  });
}
