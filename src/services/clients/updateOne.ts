import { clientSchema, UpdateClient } from "@/validations";
import fetchClient from "@/utils/fetchClient";

const clientsURL = import.meta.env?.VITE_APP_CLIENTS_URL;

export default async function updateOne(id: string, clientData: UpdateClient) {
  const res = await fetchClient.fetch(`${clientsURL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(clientData),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  return clientSchema.parse(data);
}
