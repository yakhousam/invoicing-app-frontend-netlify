import { useAuth } from "react-oidc-context";
import { setToken } from "./utils/fetchClient";
import { Router, RouterProvider } from "@tanstack/react-router";
import { Box, CircularProgress } from "@mui/material";

const App = ({ router }: { router: Router<any, any, any> }) => {
  const auth = useAuth();
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

  if (auth.error) {
    return <Box>Encountering error... {auth.error.message}</Box>;
  }
  // Set the token on the fetchClient
  if (auth.user?.access_token) {
    setToken(auth.user?.access_token as string);
    return <RouterProvider router={router} context={{ auth }} />;
  }
  auth.signinRedirect();
  return null;
};

export default App;
