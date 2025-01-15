import { serviceUser } from "@/services/user";
import { queryOptions } from "@tanstack/react-query";

export const getUserOptions = (token: string) =>
  queryOptions({
    queryKey: ["user"],
    queryFn: () => serviceUser.getUser(token),
    staleTime: Infinity,
  });

export const userSignatureOptions = (idToken: string) =>
  queryOptions({
    queryKey: ["userSignature", idToken],
    queryFn: () => serviceUser.getSignature(idToken),
    enabled: !!idToken,
    staleTime: 3600 * 1000, // one hour in milliseconds
  });
