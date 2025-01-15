import { clientsOptions } from "@/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/clients/")({
  beforeLoad: () => {
    return {
      getTitle: () => "Clients",
    };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(clientsOptions),
});
