import fetchClient from "@/utils/fetchClient";

const invoicesURL = import.meta.env?.VITE_APP_INVOICES_URL;

export default async function deleteOne(id: string) {
  const res = await fetchClient.fetch(`${invoicesURL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return;
}
