import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

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

afterEach(() => {
  cleanup();
});
