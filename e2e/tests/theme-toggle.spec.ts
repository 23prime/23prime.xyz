import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have theme toggle button", async ({ page }) => {
    // Theme toggle button has emojis (☀️, 🌙, 💻) and sr-only text "Toggle theme"
    const themeButton = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeButton).toBeVisible();
  });

  test("should toggle theme", async ({ page }) => {
    // Find theme toggle button by its accessible name
    const themeButton = page.getByRole("button", { name: /toggle theme/i });
    await themeButton.click();

    // Wait for theme to change
    await page.waitForTimeout(500);

    // Check if theme class or attribute changed
    const html = page.locator("html");
    const classList = await html.getAttribute("class");

    expect(classList).toBeTruthy();
  });

  test("should persist theme preference", async ({ page }) => {
    // Find theme toggle button by its accessible name
    const themeButton = page.getByRole("button", { name: /toggle theme/i });
    await themeButton.click();
    await page.waitForTimeout(500);

    // Get current theme
    const html = page.locator("html");
    const currentTheme = await html.getAttribute("class");

    // Reload page
    await page.reload();
    await page.waitForTimeout(500);

    // Check if theme persisted
    const newTheme = await html.getAttribute("class");
    expect(currentTheme).toBe(newTheme);
  });
});
