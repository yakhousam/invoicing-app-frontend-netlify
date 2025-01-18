import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries
    },
  },
});

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </QueryClientProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
// export const renderWithRouterContext = ({
//   component,
//   path = '/',
//   initialEntries = [path],
//   isAuthenticated = false
// }: {
//   component: ReactNode
//   path?: RouterPath
//   initialEntries?: string[]
//   isAuthenticated?: boolean
// }) => {
//   const rootRoute = createRootRoute({
//     component: Outlet
//   })

//   const componentRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path,
//     component: () => <Wrapper>{component}</Wrapper>
//   })

//   const router = createRouter({
//     routeTree: rootRoute.addChildren([componentRoute]),
//     history: createMemoryHistory({
//       initialEntries
//     }),
//     context: {
//       queryClient,
//       auth: {
//         ...auth,
//         isAuthenticated
//       }
//     }
//   })
//   // @ts-expect-error This error occurs because of the declaration in main.tsx
//   return render(<RouterProvider router={router} />)
// }
