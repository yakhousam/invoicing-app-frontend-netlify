import { generateInvoice } from "@/tests/utils/generate";
import { expect, test } from "@playwright/test";
import dayjs from "dayjs";

test.describe("invoices page", () => {
  test("should create an invoice", async ({ page }) => {
    const newInvoice = generateInvoice();
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
      .fill(newInvoice.invoiceDueDays.toString());
    await page
      .getByLabel(/invoice date/i)
      .fill(dayjs(newInvoice.invoiceDate).format("YYYY-MM-DD"));
    // Select client
    await page.getByLabel(/client/i).click();
    const options = await page.getByRole("option").all();
    const randomClientIndex = Math.floor(Math.random() * options.length);
    await options[randomClientIndex].click(); // Select the first client
    // selct the currency
    if (newInvoice.currency !== "EUR") {
      await page.getByLabel(/currency/i).click();
      await page.getByText(newInvoice.currency).click();
    }

    await page
      .getByLabel(/tax percentage/i)
      .fill(newInvoice.taxPercentage.toString());
    for (let i = 0; i < newInvoice.items.length; i++) {
      const item = newInvoice.items[i];
      await page
        .getByLabel(/description/i)
        .nth(i)
        .fill(item.itemName);
      await page
        .getByLabel(/quantity/i)
        .nth(i)
        .fill(item.itemQuantity.toString());
      await page.getByLabel(/price/i).nth(i).fill(item.itemPrice.toString());
      if (i < newInvoice.items.length - 1) {
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

  test('should set the invoice status to "paid"', async ({ page }) => {
    await page.goto("/invoices");
    await page.waitForLoadState("networkidle");
    await page.getByRole("table").getByRole("row").nth(1).click();
    await page.getByRole("checkbox", { name: /paid/i }).check();
    await page.getByRole("button", { name: /save/i }).click();

    await expect(page.getByRole("alert")).toHaveText(/invoice updated/i);
  });

  test("should delete an invoice", async ({ page }) => {
    await page.goto("/invoices");
    await page.waitForLoadState("networkidle");
    await page.getByRole("table").getByRole("row").nth(1).click();
    await page.getByRole("button", { name: /delete/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /delete/i }).click();
    await expect(page.getByRole("alert")).toHaveText(/invoice deleted/i);
  });
});
