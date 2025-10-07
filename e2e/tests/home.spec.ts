import { test, expect } from "@playwright/test";

async function navigateToPage(page: any, href: string) {
  const isMobile = page.viewportSize().width < 768;

  if (isMobile) {
    // On mobile, open hamburger menu and click link in sheet
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();
    const sheet = page.locator('[role="dialog"]');
    await sheet.locator(`a[href="${href}"]`).click();
  } else {
    // On desktop, click link directly in header
    await page.click(`header a[href="${href}"]`);
  }
}

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
    await navigateToPage(page, "/about");
    await expect(page).toHaveURL(/\/about/);
  });

  test("should navigate to Projects page", async ({ page }) => {
    await navigateToPage(page, "/projects");
    await expect(page).toHaveURL(/\/projects/);
  });

  test("should navigate to Contact page", async ({ page }) => {
    await navigateToPage(page, "/contact");
    await expect(page).toHaveURL(/\/contact/);
  });
});
