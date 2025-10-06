import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display home page", async ({ page }) => {
    await expect(page).toHaveTitle("23prime");
  });

  test("should have header with navigation", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should navigate to About page", async ({ page }) => {
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/\/about/);
  });

  test("should navigate to Projects page", async ({ page }) => {
    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL(/\/projects/);
  });

  test("should navigate to Contact page", async ({ page }) => {
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/\/contact/);
  });
});
