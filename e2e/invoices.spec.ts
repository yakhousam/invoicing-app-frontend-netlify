import { generateInvoice } from "@/tests/utils/generate";
import { expect, test } from "@playwright/test";
import dayjs from "dayjs";

// test.describe.configure({ mode: "serial" });

test.describe("overview page", () => {
  const invoice = generateInvoice();

  test("should create an invoice", async ({ page }) => {
    await page.goto("/invoices");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: /invoices/i })
    ).toBeVisible();
    const tablePagination = (await page
      .getByText(/\d+-\d+ of \d+/)
      .textContent()) as string;
    const totalInvoices = parseInt(tablePagination.split("of ")[1]);
    // Create a new invoice
    await page.getByRole("button", { name: /new invoice/i }).click();
    await page.waitForURL("/invoices/create");
    await expect(
      page.getByRole("heading", { name: /create a new invoice/i })
    ).toBeVisible();

    await page
      .getByLabel(/invoice due days/i)
      .fill(invoice.invoiceDueDays.toString());
    await page
      .getByLabel(/invoice date/i)
      .fill(dayjs(invoice.invoiceDate).format("YYYY-MM-DD"));
    // Select client
    await page.getByLabel(/client/i).click();
    const options = await page.getByRole("option").all();
    const randomClientIndex = Math.floor(Math.random() * options.length);
    await options[randomClientIndex].click(); // Select the first client
    // selct the currency
    if (invoice.currency !== "EUR") {
      await page.getByLabel(/currency/i).click();
      await page.getByText(invoice.currency).click();
    }

    await page
      .getByLabel(/tax percentage/i)
      .fill(invoice.taxPercentage.toString());
    for (let i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      await page
        .getByLabel(/description/i)
        .nth(i)
        .fill(item.itemName);
      await page
        .getByLabel(/quantity/i)
        .nth(i)
        .fill(item.itemQuantity.toString());
      await page.getByLabel(/price/i).nth(i).fill(item.itemPrice.toString());
      if (i < invoice.items.length - 1) {
        await page.getByRole("button", { name: /add item/i }).click();
      }
    }

    await page.getByRole("button", { name: /create/i }).click();
    await expect(page.getByRole("alert")).toHaveText(/invoice created/i);

    await page.goBack();
    await page.waitForURL(/invoices/);

    // check if the total invoices increased
    const tablePaginationAfter = (await page
      .getByText(/\d+-\d+ of \d+/)
      .textContent()) as string;
    const totalInvoicesAfter = parseInt(tablePaginationAfter.split("of ")[1]);
    expect(totalInvoicesAfter).toBe(totalInvoices + 1);
  });
});
