import { invoiceByIdOptions } from "@/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/invoices/$id")({
  beforeLoad: () => ({
    getTitle: () => "Invoice",
  }),
  loader: ({ context, params }) => {
    return context.queryClient?.ensureQueryData(invoiceByIdOptions(params.id));
  },
});
