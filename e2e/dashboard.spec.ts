import { expect, test } from "@playwright/test";

test("show dashboard", async ({ page }) => {
  await page.goto("/overview");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});
