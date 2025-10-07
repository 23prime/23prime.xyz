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

  test("should have external links", async ({ page }) => {
    const isMobile = page.viewportSize().width < 768;

    if (isMobile) {
      // On mobile, check for external links in the main content (not in header menu)
      const links = page.locator("main a[href^='http']");
      await expect(links.first()).toBeVisible();
    } else {
      // On desktop, check for any external links
      const links = page.locator("a[href^='http']");
      await expect(links.first()).toBeVisible();
    }
  });

  test("should navigate back to home", async ({ page }) => {
    await navigateToPage(page, "/");
    await expect(page).toHaveURL(/^.*\/$/);
  });
});
