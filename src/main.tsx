import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorComponent, createRouter } from "@tanstack/react-router";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
import { Spinner } from "./components/spinner";
import { cognitoAuthConfig } from "./config";
import { routeTree } from "./routeTree.gen";
import * as config from "@/config";
console.log(JSON.stringify(config, null, 2));

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
          <App router={router} />
        </SnackbarProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
