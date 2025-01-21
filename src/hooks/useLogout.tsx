import { useAuth } from "react-oidc-context";
import * as config from "@/config";

const useLogout = () => {
  const auth = useAuth();

  const handleLogout = () => {
    // auth.removeUser();
    auth.signoutSilent();
    const clientId = config.clientId;
    const logoutUri = config.singoutUri;
    const cognitoDomain = config.domain;
    console.log("logoutUri", logoutUri);
    console.log("cognitoDomain", cognitoDomain);
    console.log("clientId", clientId);
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  return handleLogout;
};

export default useLogout;
