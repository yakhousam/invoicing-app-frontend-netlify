import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/clients/create")({
  beforeLoad: () => ({
    getTitle: () => "Add New Client",
  }),
});
