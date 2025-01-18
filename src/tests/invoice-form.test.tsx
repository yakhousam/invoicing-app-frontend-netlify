import CreateInvoiceForm from "@/components/invoice/CreateInvoiceForm";
import { Wrapper, queryClient } from "./utils/wrappers";
import userEvent from "@testing-library/user-event";
import {
  generateClient,
  generateClients,
  generateInvoice,
  generateUser,
} from "./utils/generate";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import {
  vi,
  describe,
  it,
  afterAll,
  expect,
  Mock,
  beforeEach,
  beforeAll,
} from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import dayjs from "dayjs";
import { Client, CreateInvoice, Invoice } from "@/validations";
import { http, HttpResponse, server } from "./utils/node";
import * as config from "@/config";
import { getUserOptions, clientsOptions } from "@/queries";

const cognitoMock = mockClient(CognitoIdentityProviderClient);
const authUser = generateUser();
cognitoMock.on(GetUserCommand).resolves({
  UserAttributes: [
    {
      Name: "name",
      Value: authUser.name,
    },
    {
      Name: "email",
      Value: authUser.email,
    },
  ],
});

describe("InvoiceForm", () => {
  beforeEach(async () => {
    await queryClient.prefetchQuery(getUserOptions(""));
  });
  it("renders a form", async () => {
    await queryClient.prefetchQuery(clientsOptions);
    render(<CreateInvoiceForm />, { wrapper: Wrapper });
    // need to wait for data to be fetched
    waitFor(
      () => {
        expect(screen.getByLabelText(/invoice due days/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    expect(
      await screen.findByLabelText(/invoice due days/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/invoice date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/currency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tax percentage/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /invoice items/i })
    ).toBeInTheDocument();
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

  it("create invoice", async () => {
    const user = userEvent.setup();

    const mockInvoice = generateInvoice();
    const clients: Client[] = generateClients(10);
    clients[0].clientName = "Test Client";
    mockInvoice.clientId = clients[0].clientId;
    mockInvoice.clientName = clients[0].clientName;

    let postedInvoice: CreateInvoice | undefined;
    server.use(
      http.get(config.clientsUrl, () => {
        console.log("get all clients create invoice..................");
        return HttpResponse.json({ clients, count: clients.length });
      }),
      http.post(config.invoicesUrl, async ({ request }) => {
        postedInvoice = (await request.json()) as CreateInvoice;
        return HttpResponse.json(generateInvoice());
      })
    );
    await queryClient.prefetchQuery(clientsOptions);

    render(<CreateInvoiceForm />, { wrapper: Wrapper });
    // need to wait for data to be fetched
    expect(
      await screen.findByLabelText(/invoice due days/i)
    ).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/invoice due days/i));
    await user.type(
      screen.getByLabelText(/invoice due days/i),
      mockInvoice.invoiceDueDays.toString()
    );

    const invoiceDateInput = screen.getByLabelText(/invoice date/i);
    // I couldn't use user.type here because apparently it doesn't work with mui date inputs
    fireEvent.change(invoiceDateInput, {
      target: { value: dayjs(mockInvoice.invoiceDate).format("YYYY-MM-DD") },
    });

    // select a client
    const selectClientElement = screen.getByRole("combobox", {
      name: /client/i,
    }) as HTMLSelectElement;
    await user.click(selectClientElement);
    await user.click(await screen.findByText(mockInvoice.clientName));
    //

    // select currency
    if (mockInvoice.currency !== "EUR") {
      const currencySelectElement = screen.getByRole("combobox", {
        name: /currency/i,
      }) as HTMLSelectElement;
      await user.click(currencySelectElement);
      await user.click(await screen.findByText(mockInvoice.currency));
    }
    //

    await user.clear(screen.getByLabelText(/tax percentage/i));
    await user.type(
      screen.getByLabelText(/tax percentage/i),
      mockInvoice.taxPercentage.toString()
    );

    await user.type(
      screen.getByLabelText(/description/i),
      mockInvoice.items[0].itemName
    );
    await user.type(
      screen.getByLabelText(/price/i),
      mockInvoice.items[0].itemPrice.toString()
    );
    await user.clear(screen.getByLabelText(/quantity/i));
    await user.type(
      screen.getByLabelText(/quantity/i),
      mockInvoice.items[0].itemQuantity.toString()
    );

    await user.click(screen.getByRole("button", { name: /create invoice/i }));

    // check that the user sees a success message
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(/invoice created/i);
    });

    // check that the invoice was posted correctly

    expect(postedInvoice?.invoiceDueDays).toBe(mockInvoice.invoiceDueDays);
    expect(postedInvoice?.invoiceDate).toBeTruthy();
    expect(postedInvoice?.clientId).toBe(mockInvoice.clientId);
    expect(postedInvoice?.currency).toBe(mockInvoice.currency);
    expect(postedInvoice?.taxPercentage).toBe(mockInvoice.taxPercentage);
    expect(postedInvoice?.items?.[0].itemName).toBe(
      mockInvoice.items[0].itemName
    );
    expect(postedInvoice?.items?.[0].itemPrice).toBe(
      mockInvoice.items[0].itemPrice
    );
    expect(postedInvoice?.items?.[0].itemQuantity).toBe(
      mockInvoice.items[0].itemQuantity
    );

    // test that the form is cleared after submission
    expect(screen.getByLabelText(/invoice due days/i)).toHaveValue(7);
    expect(screen.queryByText(mockInvoice.clientName)).toBeNull();
    expect(screen.getByLabelText(/currency/i)).toHaveTextContent("EUR");
    expect(screen.getByLabelText(/tax percentage/i)).toHaveValue(0);
    expect(screen.getByLabelText(/description/i)).toHaveTextContent("");
    expect(screen.getByLabelText(/price/i)).toHaveValue(0);
    expect(screen.getByLabelText(/quantity/i)).toHaveValue(1);
  });

  it("shows error message when creating invoice fails", async () => {
    const user = userEvent.setup();

    const clients: Client[] = generateClients(10);
    server.use(
      http.get(config.clientsUrl, () => {
        return HttpResponse.json({ clients, count: clients.length });
      }),
      http.post(config.invoicesUrl, async () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    await queryClient.prefetchQuery(clientsOptions);

    render(<CreateInvoiceForm />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", {
          name: /client/i,
        })
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("combobox", {
        name: /client/i,
      })
    );
    await user.click(await screen.findByText(clients[0].clientName));
    await user.type(screen.getByLabelText(/description/i), "React developer");
    await user.type(screen.getByLabelText(/price/i), "100");

    await user.click(screen.getByRole("button", { name: /create invoice/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(/error/i);
    });
  });

  describe("validations", () => {
    it("shows error when creating invoice without client", async () => {
      const user = userEvent.setup();
      await queryClient.prefetchQuery(clientsOptions);
      render(<CreateInvoiceForm />, { wrapper: Wrapper });
      await waitFor(() => {
        expect(
          screen.getByRole("combobox", {
            name: /client/i,
          })
        ).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: /create invoice/i }));

      await waitFor(() => {
        expect(screen.getByText(/client is required/i)).toBeInTheDocument();
      });
    });

    it("shows error message when creating invoice without items", async () => {
      const user = userEvent.setup();
      const clients: Client[] = generateClients(10);
      server.use(
        http.get(config.clientsUrl, () => {
          return HttpResponse.json({ clients, count: clients.length });
        })
      );
      await queryClient.prefetchQuery(clientsOptions);
      render(<CreateInvoiceForm />, { wrapper: Wrapper });
      await waitFor(() => {
        expect(
          screen.getByRole("combobox", {
            name: /client/i,
          })
        ).toBeInTheDocument();
      });

      await user.click(
        screen.getByRole("combobox", {
          name: /client/i,
        })
      );
      await user.click(await screen.findByText(clients[0].clientName));

      await user.click(screen.getByRole("button", { name: /create invoice/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/item description must be at least 1 character/i)
        ).toBeInTheDocument();
      });
    });

    it("shows error message when creating invoice with none strict positive price", async () => {
      const user = userEvent.setup();
      const clients: Client[] = generateClients(10);
      server.use(
        http.get(config.clientsUrl, () => {
          return HttpResponse.json({ clients, count: clients.length });
        })
      );
      await queryClient.prefetchQuery(clientsOptions);
      render(<CreateInvoiceForm />, { wrapper: Wrapper });
      await waitFor(() => {
        expect(
          screen.getByRole("combobox", {
            name: /client/i,
          })
        ).toBeInTheDocument();
      });

      await user.click(
        screen.getByRole("combobox", {
          name: /client/i,
        })
      );
      await user.click(await screen.findByText(clients[0].clientName));

      await user.type(screen.getByLabelText(/description/i), "React developer");
      await user.type(screen.getByLabelText(/price/i), "invalid");

      await user.click(screen.getByRole("button", { name: /create invoice/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/item price must be a positive number/i)
        ).toBeInTheDocument();
      });
    });
  });
});
