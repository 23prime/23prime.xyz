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

test.describe("Navigation", () => {
  test("should navigate through all pages", async ({ page }) => {
    // Start at home
    await page.goto("/");
    await expect(page).toHaveURL(/^.*\/$/);

    // Go to About
    await navigateToPage(page, "/about");
    await expect(page).toHaveURL(/\/about/);

    // Go to Projects
    await navigateToPage(page, "/projects");
    await expect(page).toHaveURL(/\/projects/);

    // Go to Contact
    await navigateToPage(page, "/contact");
    await expect(page).toHaveURL(/\/contact/);

    // Go back to Home
    await navigateToPage(page, "/");
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
    await navigateToPage(page, "/about");
    await expect(page).toHaveURL(/\/about/);

    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/^.*\/$/);

    // Go forward
    await page.goForward();
    await expect(page).toHaveURL(/\/about/);
  });
});
