import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { AuthProvider, useAuth } from "react-oidc-context";
import { Spinner } from "./components/spinner";
import { routeTree } from "./routeTree.gen";
import fetchClient from "./utils/fetchClient";
import { cognitoAuthConfig } from "./config";

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: Spinner,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // This will be set by the AuthProvider
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider {...cognitoAuthConfig}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={3000}
        >
          <InnerApp />
        </SnackbarProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function InnerApp() {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  // Set the token on the fetchClient
  if (auth.user?.access_token) {
    console.log("auth.user?.access_token", auth.user?.access_token);
    console.log("auth.user", auth.user);
    fetchClient.setToken(auth.user?.access_token as string);
    // getUserAttributes(auth.user?.access_token as string);
    // updateUserSignature(
    //   auth.user?.access_token as string,
    //   "https://example.com"
    // );
  }

  return <RouterProvider router={router} context={{ auth }} />;
}
