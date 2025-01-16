import { afterAll, describe, expect, it, vi, type Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ClientForm from "@/components/client/ClientForm";
import { Wrapper } from "./utils/wrappers";
import userEvent from "@testing-library/user-event";
import { generateClient } from "./utils/generate";
import { http, HttpResponse, server } from "./utils/node";
import * as config from "@/config";

describe("ClientForm", () => {
  it("renders a form", () => {
    render(<ClientForm />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("create client", async () => {
    render(<ClientForm />, {
      wrapper: Wrapper,
    });
    const client = generateClient();
    const { clientName, email, address } = client;

    await userEvent.type(screen.getByLabelText(/name/i), clientName);
    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/address/i), address);
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    // check that the user sees a success message
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(/client created/i);
    });
    // test that the form is cleared after submission
    expect(screen.getByLabelText(/name/i)).toHaveTextContent("");
    expect(screen.getByLabelText(/email/i)).toHaveTextContent("");
    expect(screen.getByLabelText(/address/i)).toHaveTextContent("");
  });

  it("shows an error message when the request fails", async () => {
    server.use(
      http.post(config.clientsUrl, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<ClientForm />, {
      wrapper: Wrapper,
    });
    const client = generateClient();
    const { clientName, email, address } = client;

    await userEvent.type(screen.getByLabelText(/name/i), clientName);
    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/address/i), address);
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    // check that the user sees an error message
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(/error/i);
    });
  });

  it("shows an error message when email is duplicated", async () => {
    server.use(
      http.post(config.clientsUrl, () => {
        return new HttpResponse("email already exists", { status: 409 });
      })
    );
    render(<ClientForm />, {
      wrapper: Wrapper,
    });
    const client = generateClient();
    const { clientName, email, address } = client;

    await userEvent.type(screen.getByLabelText(/name/i), clientName);
    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/address/i), address);
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    await screen.findByText(/email already exists/i);
  });

  it("shows an error message when client name is duplicated", async () => {
    server.use(
      http.post(config.clientsUrl, () => {
        return new HttpResponse("client name already exists", { status: 409 });
      })
    );
    render(<ClientForm />, {
      wrapper: Wrapper,
    });
    const client = generateClient();
    const { clientName, email, address } = client;

    await userEvent.type(screen.getByLabelText(/name/i), clientName);
    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/address/i), address);
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    await screen.findByText(/client name already exists/i);
  });
  describe("validation", () => {
    it("shows an error message when the name is empty", async () => {
      render(<ClientForm />, {
        wrapper: Wrapper,
      });
      await userEvent.type(screen.getByLabelText(/email/i), "email");
      await userEvent.type(screen.getByLabelText(/address/i), "address");
      await userEvent.click(screen.getByRole("button", { name: /create/i }));

      await screen.findByText(/name is required/i);
    });

    it("shows an error message when the email is empty", async () => {
      render(<ClientForm />, {
        wrapper: Wrapper,
      });
      await userEvent.type(screen.getByLabelText(/name/i), "name");
      await userEvent.type(screen.getByLabelText(/address/i), "address");
      await userEvent.click(screen.getByRole("button", { name: /create/i }));

      await screen.findByText(/invalid email/i);
    });

    it("should show an error message when the email is invalid", async () => {
      render(<ClientForm />, { wrapper: Wrapper });
      await userEvent.type(screen.getByLabelText(/name/i), "name");
      await userEvent.type(screen.getByLabelText(/email/i), "invalid-email");
      await userEvent.type(screen.getByLabelText(/address/i), "address");
      await userEvent.click(screen.getByRole("button", { name: /create/i }));

      await screen.findByText(/invalid email/i);
    });
  });
});
