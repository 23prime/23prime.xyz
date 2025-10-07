import { test, expect } from "@playwright/test";

test.describe("Header - Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
  });

  test("should display regular navigation menu on desktop", async ({ page }) => {
    // Desktop navigation should be visible
    const desktopNav = page.locator("header nav > div").first();
    await expect(desktopNav).toBeVisible();

    // Check that navigation links are visible (use text to distinguish from logo)
    await expect(page.locator('header a:has-text("Home")')).toBeVisible();
    await expect(page.locator('header a[href="/about"]')).toBeVisible();
    await expect(page.locator('header a[href="/projects"]')).toBeVisible();
    await expect(page.locator('header a[href="/contact"]')).toBeVisible();
  });

  test("should not display hamburger menu on desktop", async ({ page }) => {
    // Hamburger menu button should not be visible
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).not.toBeVisible();
  });

  test("should display theme toggle on desktop", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
  });
});

test.describe("Header - Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
  });

  test("should display hamburger menu on mobile", async ({ page }) => {
    // Hamburger menu button should be visible
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
  });

  test("should display theme toggle on mobile", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
  });

  test("should open mobile menu when hamburger is clicked", async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    // Sheet should be visible
    const sheet = page.locator('[role="dialog"]');
    await expect(sheet).toBeVisible();

    // Navigation links should be visible in the sheet
    await expect(sheet.locator('a[href="/"]')).toBeVisible();
    await expect(sheet.locator('a[href="/about"]')).toBeVisible();
    await expect(sheet.locator('a[href="/projects"]')).toBeVisible();
    await expect(sheet.locator('a[href="/contact"]')).toBeVisible();
  });

  test("should navigate to About page from mobile menu", async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    const sheet = page.locator('[role="dialog"]');
    await expect(sheet).toBeVisible();

    await sheet.locator('a[href="/about"]').click();

    // Should navigate to About page
    await expect(page).toHaveURL(/\/about/);

    // Sheet should be closed after navigation
    await expect(sheet).not.toBeVisible();
  });

  test("should navigate to Projects page from mobile menu", async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    const sheet = page.locator('[role="dialog"]');
    await sheet.locator('a[href="/projects"]').click();

    await expect(page).toHaveURL(/\/projects/);
    await expect(sheet).not.toBeVisible();
  });

  test("should navigate to Contact page from mobile menu", async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    const sheet = page.locator('[role="dialog"]');
    await sheet.locator('a[href="/contact"]').click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(sheet).not.toBeVisible();
  });

  test("should navigate to Home page from mobile menu", async ({ page }) => {
    // First go to another page
    await page.goto("/about");

    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    const sheet = page.locator('[role="dialog"]');
    await sheet.locator('a[href="/"]').click();

    await expect(page).toHaveURL(/^.*\/$/);
    await expect(sheet).not.toBeVisible();
  });

  test("should open external blog link in mobile menu", async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    const sheet = page.locator('[role="dialog"]');
    const blogLink = sheet.locator('a:has-text("Blog")');
    await expect(blogLink).toBeVisible();
    await expect(blogLink).toHaveAttribute("target", "_blank");
    await expect(blogLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
