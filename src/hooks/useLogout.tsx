import { useAuth } from "react-oidc-context";
import * as config from "@/config";

const useLogout = () => {
  const auth = useAuth();

  const handleLogout = () => {
    // auth.removeUser();
    auth.signoutSilent();
    // const clientId = config.clientId;
    // const logoutUri = config.singoutUri;
    // const cognitoDomain = config.domain;
    // window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    const clientId = "17pae71c1gerpu90vu2uieo6o8";
    const logoutUri = "https://invoicing-app.khoudiryaya.dev";
    const cognitoDomain =
      "https://invoicing-app-v2-541303084246.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  return handleLogout;
};

export default useLogout;
