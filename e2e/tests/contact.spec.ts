import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("should display contact page", async ({ page }) => {
    await expect(page).toHaveURL(/\/contact/);
  });

  test("should have header with navigation", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should have Twitter link", async ({ page, context }) => {
    const link = page.locator("a[href^='https://x.com']").first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");

    const pagePromise = context.waitForEvent("page");
    await link.click();

    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/x\.com/);
  });

  test("should have GitHub link", async ({ page, context }) => {
    const link = page.locator("a[href^='https://github.com']").first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");

    const pagePromise = context.waitForEvent("page");
    await link.click();

    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/github\.com/);
  });

  test("should have mail link", async ({ page }) => {
    const link = page.locator("a[href^='mailto:']").first();
    await expect(link).toBeVisible();
  });
});
