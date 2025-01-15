import { Client, Invoice, Item, User } from "@/validations";
import { faker } from "@faker-js/faker";

export function generateUser(): User {
  return {
    email: faker.internet.email(),
    name: faker.company.name(),
  };
}

export function generateClient(): Required<Client> {
  return {
    clientId: faker.string.uuid(),
    clientName: faker.company.name(),
    email: faker.internet.email(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    userId: faker.string.uuid(),
    currencyPreference: faker.finance.currencyCode(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    VATNumber: faker.string.uuid(),
  };
}

export function generateClients(num: number): Required<Client[]> {
  return Array(num)
    .fill(0)
    .map(() => generateClient());
}

function generateItems(num: number) {
  const items: Item[] = Array(num)
    .fill(0)
    .map(() => ({
      itemId: faker.string.uuid(),
      itemName: faker.commerce.productName(),
      itemPrice: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
      itemQuantity: faker.number.int({ min: 1, max: 100 }),
    }));
  return items as [Item, ...Item[]];
}

export function generateInvoice(): Invoice {
  return {
    invoiceId: faker.string.uuid(),
    currency: faker.helpers.arrayElement(["USD", "EUR", "GBP"]),
    taxPercentage: faker.number.int({ min: 0, max: 30 }),
    items: generateItems(faker.number.int({ min: 1, max: 10 })),
    clientId: faker.string.uuid(),
    clientName: faker.company.name(),
    userId: faker.string.uuid(),
    userName: faker.company.name(),
    invoiceDate: faker.date.recent({ days: 30 }).toISOString(),
    invoiceDueDays: faker.number.int({ min: 1, max: 30 }),
    paid: false,
    status: "sent",
    subTotal: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
    taxAmount: faker.number.float({ min: 0, max: 3000, fractionDigits: 2 }),
    totalAmount: faker.number.float({ min: 0, max: 13000, fractionDigits: 2 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function generateInvoices(num: number): Invoice[] {
  return Array(num)
    .fill(0)
    .map(() => generateInvoice());
}

// export function generateInvoicesTotalsByMonth(): invoicesTotalsByMonth {
//   return Array.from({ length: 10 }, () => ({
//     date: {
//       month: faker.number.int({ min: 1, max: 12 }),
//       year: faker.number.int({ min: 2010, max: 2020 })
//     },
//     total: faker.number.int({ min: 10, max: 10000 }),
//     paid: faker.number.int({ min: 1, max: 10 }),
//     unpaid: faker.number.int({ min: 1, max: 10 })
//   }))
// }

// export function generateInvoicesSummary(): invoicesSummary {
//   return [
//     {
//       currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP']),
//       total: faker.number.int({ min: 10, max: 10000 }),
//       paid: faker.number.int({ min: 1, max: 10000 }),
//       unpaid: faker.number.int({ min: 1, max: 10000 })
//     }
//   ]
// }
