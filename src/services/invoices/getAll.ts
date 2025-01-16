import { fetchWithToken } from "@/utils/fetchClient";
import { invoiceSchema } from "@/validations";

const invoicesURL = import.meta.env?.VITE_APP_INVOICES_URL;

export default async function getAl() {
  const response = await fetchWithToken(invoicesURL);

  if (response.status === 404) {
    return {
      invoices: [],
      count: 0,
    };
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return {
    invoices: invoiceSchema.array().parse(data.invoices),
    count: data.count as number,
  };
}
