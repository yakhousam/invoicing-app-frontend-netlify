import { serviceInvoices } from "@/services/invoices";
import { queryOptions } from "@tanstack/react-query";

export const invoicesOptions = queryOptions({
  queryKey: ["invoices"],
  queryFn: serviceInvoices.getAll,
  staleTime: Infinity,
});

export const invoiceByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ["invoice", id],
    queryFn: () => serviceInvoices.getById(id),
  });
