import { invoicesOptions } from "@/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/overview")({
  beforeLoad: () => ({
    getTitle: () => "Overview",
  }),
  loader: ({ context }) =>
    context.queryClient?.ensureQueryData(invoicesOptions),
});
