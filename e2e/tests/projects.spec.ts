import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("should display projects page", async ({ page }) => {
    await expect(page).toHaveURL(/\/projects/);
  });

  test("should have header with navigation", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should have footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should navigate back to home", async ({ page }) => {
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/^.*\/$/);
  });
});
