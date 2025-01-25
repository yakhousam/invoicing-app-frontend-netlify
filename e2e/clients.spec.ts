import { generateClient } from "@/tests/utils/generate";
import { expect, test } from "@playwright/test";

test("should create a client", async ({ page }) => {
  const client = generateClient();
  await page.goto("/clients");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /new client/i }).click();
  await page.waitForURL(/clients\/create/);
  await expect(
    page.getByRole("heading", { name: /add new client/i })
  ).toBeVisible();
  await page.getByLabel(/name/i).fill(client.clientName);
  await page.getByLabel(/email/i).fill(client.email);
  await page.getByLabel(/address/i).fill(client.address);
  await page.getByRole("button", { name: /create/i }).click();

  await expect(page.getByRole("alert")).toHaveText(/client created/i);

  await page.goBack();
  await page.waitForURL(/clients/);
  await expect(page.getByText(client.clientName)).toBeVisible();
  await expect(page.getByText(client.email)).toBeVisible();
  await expect(page.getByText(client.address)).toBeVisible();
});
