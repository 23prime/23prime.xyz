import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate through all pages", async ({ page }) => {
    // Start at home
    await page.goto("/");
    await expect(page).toHaveURL(/^.*\/$/);

    // Go to About
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/\/about/);

    // Go to Projects
    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL(/\/projects/);

    // Go to Contact
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/\/contact/);

    // Go back to Home
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/^.*\/$/);
  });

  test("should handle direct URL navigation", async ({ page }) => {
    // Direct navigation to About
    await page.goto("/about");
    await expect(page).toHaveURL(/\/about/);

    // Direct navigation to Projects
    await page.goto("/projects");
    await expect(page).toHaveURL(/\/projects/);

    // Direct navigation to Contact
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/contact/);

    // Direct navigation to Home
    await page.goto("/");
    await expect(page).toHaveURL(/^.*\/$/);
  });

  test("should use browser back/forward buttons", async ({ page }) => {
    await page.goto("/");

    // Navigate to About
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/\/about/);

    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/^.*\/$/);

    // Go forward
    await page.goForward();
    await expect(page).toHaveURL(/\/about/);
  });
});
