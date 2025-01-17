import { hasAuthParams, useAuth } from "react-oidc-context";
import { setToken } from "./utils/fetchClient";
import { Router, RouterProvider } from "@tanstack/react-router";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const App = ({ router }: { router: Router<any, any, any> }) => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  // automatically sign-in
  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth.isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!auth.isAuthenticated) {
    return <div>Unable to log in</div>;
  }

  // Set the token on the fetchClient
  if (auth.user?.access_token) {
    setToken(auth.user?.access_token as string);
  }
  return <RouterProvider router={router} context={{ auth }} />;
};

export default App;
