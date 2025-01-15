import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/clients/$id")({
  beforeLoad: () => {
    return {
      getTitle: () => "Client Edit",
    };
  },
});
