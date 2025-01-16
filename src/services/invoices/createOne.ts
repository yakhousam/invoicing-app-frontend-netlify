import { fetchWithToken } from "@/utils/fetchClient";
import { type CreateInvoice, invoiceSchema } from "@/validations";

const invoicesURL = import.meta.env?.VITE_APP_INVOICES_URL;

export default async function createOne(invoiceData: CreateInvoice) {
  const res = await fetchWithToken(invoicesURL, {
    method: "POST",
    body: JSON.stringify(invoiceData),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const returnedData = await res.json();
  return invoiceSchema.parse(returnedData);
}
