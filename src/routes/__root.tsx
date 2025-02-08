import { ChartProvider } from "@/hooks/useChart";
import { SummaryProvider } from "@/hooks/useSummary";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import { type AuthContextProps } from "react-oidc-context";

interface RouteContext {
  queryClient: QueryClient;
  auth: AuthContextProps;
  getTitle?: () => string;
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRouteWithContext<RouteContext>()({
  beforeLoad: () => {
    if (window.location.pathname === "/login") {
      throw redirect({ to: "/overview" });
    }
  },
  component: () => (
    <>
      <ChartProvider>
        <SummaryProvider>
          <Outlet />
        </SummaryProvider>
      </ChartProvider>
      <Suspense>
        <TanStackRouterDevtools position="bottom-left" />
      </Suspense>
    </>
  ),
});
