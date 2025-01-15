import fetchClient from "@/utils/fetchClient";
import { type CreateClient, clientSchema } from "@/validations";

const clientsURL = import.meta.env?.VITE_APP_CLIENTS_URL;

export default async function createOne(clientData: CreateClient) {
  const res = await fetchClient.fetch(clientsURL, {
    method: "POST",

    body: JSON.stringify(clientData),
  });
  if (!res.ok) {
    throw res;
  }
  const returnedData = await res.json();
  const client = clientSchema.parse(returnedData);
  return client;
}
