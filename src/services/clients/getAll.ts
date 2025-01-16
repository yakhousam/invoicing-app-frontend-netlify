import { fetchWithToken } from "@/utils/fetchClient";
import { clientSchema, type Client } from "@/validations";
import * as config from "@/config";

export default async function getAll(): Promise<{
  clients: Client[];
  count: number;
}> {
  const response = await fetchWithToken(config.clientsUrl);
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
