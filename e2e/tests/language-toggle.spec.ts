import { test, expect, type Page } from "@playwright/test";

function languageToggle(page: Page) {
  // Both desktop and mobile headers render a toggle; only one is visible per viewport.
  return page.locator('[data-testid="language-toggle"]:visible');
}

test.describe("Language Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have language toggle button", async ({ page }) => {
    await expect(languageToggle(page)).toBeVisible();
  });

  test("should switch displayed language when clicked", async ({ page }) => {
    await expect(languageToggle(page)).toHaveAttribute("title", "Current language: English");

    await languageToggle(page).click();

    await expect(languageToggle(page)).toHaveAttribute("title", "現在の言語: 日本語");
  });

  test("should persist language preference across reload", async ({ page }) => {
    await languageToggle(page).click();
    await expect(languageToggle(page)).toHaveAttribute("title", "現在の言語: 日本語");

    await page.reload();

    await expect(languageToggle(page)).toHaveAttribute("title", "現在の言語: 日本語");
  });
});

test.describe("Language Detection", () => {
  test.use({ locale: "ja-JP" });

  test("should default to Japanese when browser language is Japanese", async ({ page }) => {
    await page.goto("/");
    await expect(languageToggle(page)).toHaveAttribute("title", "現在の言語: 日本語");
  });
});
