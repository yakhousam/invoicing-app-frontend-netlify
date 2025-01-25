import { generateClient } from "@/tests/utils/generate";
import { expect, test } from "@playwright/test";

test.describe("Clients page", () => {
  test("should create a client", async ({ page }) => {
    const newClient = generateClient();
    await page.goto("/clients");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /new client/i }).click();
    await page.waitForURL(/clients\/create/);
    await expect(
      page.getByRole("heading", { name: /add new client/i })
    ).toBeVisible();
    await page.getByLabel(/name/i).fill(newClient.clientName);
    await page.getByLabel(/email/i).fill(newClient.email);
    await page.getByLabel(/address/i).fill(newClient.address);
    await page.getByRole("button", { name: /create/i }).click();

    await expect(page.getByRole("alert")).toHaveText(/client created/i);

    await page.goBack();
    await page.waitForURL(/clients/);
    await expect(page.getByText(newClient.clientName)).toBeVisible();
    await expect(page.getByText(newClient.email)).toBeVisible();
    await expect(page.getByText(newClient.address)).toBeVisible();
  });
  test("should update a client", async ({ page }) => {
    const updatedClient = generateClient();
    await page.goto("/clients");
    await page.waitForLoadState("networkidle");
    await page.getByRole("table").getByRole("row").nth(1).click();
    await page.getByLabel(/name/i).fill(updatedClient.clientName);
    await page.getByLabel(/email/i).fill(updatedClient.email);
    await page.getByLabel(/address/i).fill(updatedClient.address);
    await page.getByRole("button", { name: /save/i }).click();

    await expect(page.getByRole("alert")).toHaveText(/client updated/i);
  });
});
