import { serviceClients } from "@/services/clients";
import { queryOptions } from "@tanstack/react-query";

export const clientsOptions = queryOptions({
  queryKey: ["clients"],
  queryFn: serviceClients.getAll,
  staleTime: Infinity,
});

export const clientByIdOptions = (id: string) =>
  queryOptions({
    queryKey: ["client", id],
    queryFn: () => serviceClients.getById(id),
  });
