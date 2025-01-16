import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./src/tests/utils/node";

vi.mock("react-oidc-context", () => ({
  useAuth() {
    return {
      isAuthenticated: true,
      isLoading: false,
      user: {
        email: "john_doe@email.com",
        name: "John Doe",
      },
    };
  },
}));

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
