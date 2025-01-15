import CreateInvoiceForm from "@/components/invoice/CreateInvoiceForm";
import { Wrapper } from "./utils/wrappers";
import userEvent from "@testing-library/user-event";
import { generateClients, generateInvoice } from "./utils/generate";
import { screen, render, waitFor } from "@testing-library/react";
import { vi, describe, it, afterAll, expect, Mock } from "vitest";

global.fetch = vi.fn();

describe("InvoiceForm", () => {
  it("renders a form", async () => {
    (fetch as Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(generateClients(2)), { status: 200 })
    );
    render(<CreateInvoiceForm />, { wrapper: Wrapper });
    screen.debug();
    expect(
      await screen.findByLabelText(/invoice due days/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/invoice date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/currency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tax percentage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/invoice items/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add item/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
    expect(screen.getByLabelText(/price/i)).toHaveValue(0);
    expect(screen.getByLabelText(/quantity/i)).toHaveValue(1);
    expect(
      screen.getByRole("button", { name: /delete item/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /total/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/sub total/i)).toHaveTextContent("€0.00");
    expect(screen.getByLabelText(/total tax/i)).toHaveTextContent("€0.00");
    expect(screen.getByLabelText(/grand total/i)).toHaveTextContent("€0.00");

    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });
});
