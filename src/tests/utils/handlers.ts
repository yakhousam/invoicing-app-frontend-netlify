import * as config from "@/config";
import { http, HttpResponse } from "msw";
import {
  generateClient,
  generateClients,
  generateInvoice,
  generateInvoices,
  generateUser,
} from "./generate";

const cognitoUrl = " https://cognito-idp.us-east-1.amazonaws.com";

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

// const userHandlers = [
//   http.post(cognitoUrl, async () => {
//     return HttpResponse.json({
//       AuthenticationResult: {
//         AccessToken: "mock-access-token",
//         IdToken: "mock-id-token",
//         RefreshToken: "mock-refresh-token",
//         ExpiresIn: 3600,
//       },
//     });
//   }),
// ];

export const handlers = [
  ...clientHandlers,
  ...invoiceHandlers,
  // ...userHandlers,
];
