import * as config from "@/config";
import { http, HttpResponse } from "msw";
import {
  generateClient,
  generateClients,
  generateInvoice,
  generateInvoices,
} from "./generate";

const clientHandlers = [
  http.post(config.clientsUrl, () => {
    return HttpResponse.json(generateClient());
  }),
  http.get(config.clientsUrl, () => {
    const clients = generateClients(10);
    return HttpResponse.json({ clients, count: clients.length });
  }),
];

const invoiceHandlers = [
  http.get(config.invoicesUrl, () => {
    const invoices = generateInvoices(10);
    return HttpResponse.json({ invoices, count: invoices.length });
  }),
  http.post(config.invoicesUrl, () => {
    return HttpResponse.json(generateInvoice());
  }),
];

export const handlers = [...clientHandlers, ...invoiceHandlers];
