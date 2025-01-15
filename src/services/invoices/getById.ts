import fetchClient from "@/utils/fetchClient";
import { type Invoice, invoiceSchema } from "@/validations";

const invoicesURL = import.meta.env?.VITE_APP_INVOICES_URL;

export default async function getById(id: string) {
  const response = await fetchClient.fetch(`${invoicesURL}/${id}`);

  if (response.status === 404) {
    return {} as Invoice;
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return invoiceSchema.parse(data);
}
