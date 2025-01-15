import fetchClient from "@/utils/fetchClient";
import { clientSchema, type Client } from "@/validations";

const clientsURL = import.meta.env?.VITE_APP_CLIENTS_URL;

export default async function getAll(): Promise<{
  clients: Client[];
  count: number;
}> {
  const response = await fetchClient.fetch(clientsURL);

  if (response.status === 404) {
    return {
      clients: [],
      count: 0,
    };
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return {
    clients: clientSchema.array().parse(data.clients),
    count: data.count as number,
  };
}
