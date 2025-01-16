import { fetchWithToken } from "@/utils/fetchClient";
import { clientSchema, type Client } from "@/validations";

const clientsURL = import.meta.env?.VITE_APP_CLIENTS_URL;

export default async function getById(id: string) {
  const response = await fetchWithToken(`${clientsURL}/${id}`);

  if (response.status === 404) {
    return {} as Client;
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return clientSchema.parse(data);
}
