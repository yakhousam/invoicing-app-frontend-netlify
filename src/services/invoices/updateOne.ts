import { fetchWithToken } from "@/utils/fetchClient";
import { type UpdateInvoice, invoiceSchema } from "@/validations";

const invoicesURL = import.meta.env?.VITE_APP_INVOICES_URL;

export default async function updateOne(
  id: string,
  invoiceData: UpdateInvoice
) {
  const res = await fetchWithToken(`${invoicesURL}/${id}`, {
    method: "PATCH",

    body: JSON.stringify(invoiceData),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  return invoiceSchema.parse(data);
}
