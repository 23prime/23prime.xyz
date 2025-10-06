import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should display about page", async ({ page }) => {
    await expect(page).toHaveURL(/\/about/);
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

  test("should display main heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toHaveText("About Me");
  });

  test("should display profile section", async ({ page }) => {
    const profileHeading = page.locator("h2").filter({ hasText: "Profile" });
    await expect(profileHeading).toBeVisible();

    // Check profile items are visible
    await expect(page.getByText("💻 Job: Software Developer in Tokyo")).toBeVisible();
    // await expect(page.getByText("Software Developer in Tokyo")).toBeVisible();
  });

  test("should display history section", async ({ page }) => {
    const historyHeading = page.locator("h2").filter({ hasText: "History" });
    await expect(historyHeading).toBeVisible();

    // Check table is visible
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // Check table headers
    await expect(table.getByRole("columnheader", { name: "Date" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Event" })).toBeVisible();

    // Check some history events
    await expect(table.getByText("1994/01")).toBeVisible();
    await expect(table.getByText("Born")).toBeVisible();
    await expect(table.getByText("2017/03")).toBeVisible();
    await expect(table.getByText("Bachelor’s Degree in University of Tsukuba [mathematics]")).toBeVisible();
  });

  test("should display projects section", async ({ page }) => {
    const projectsHeading = page.locator("h2").filter({ hasText: "Projects & Products at work" });
    await expect(projectsHeading).toBeVisible();

    // Check project cards are visible
    await expect(page.getByRole("heading", { name: "Authentication Platform Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "ICT Learning system" })).toBeVisible();

    // Check role information is displayed
    await expect(page.getByText("Role: Programmer / SE")).toBeVisible();
    await expect(page.getByText("Role: Tech Lead")).toBeVisible();
  });

  test("should display tech stack section", async ({ page }) => {
    const techStackHeading = page.locator("h2").filter({ hasText: "Tech Stack" });
    await expect(techStackHeading).toBeVisible();

    // Check category headings
    await expect(page.getByRole("heading", { name: "Languages", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Web Frameworks" })).toBeVisible();

    // Check some technologies are displayed
    await expect(page.getByText("Rust")).toBeVisible();
    await expect(page.getByText("React")).toBeVisible();
    await expect(page.getByText("AWS")).toBeVisible();
    await expect(page.getByText("PostgreSQL")).toBeVisible();
    await expect(page.getByText("Git/GitHub")).toBeVisible();
  });

  test("should navigate back to home", async ({ page }) => {
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/^.*\/$/);
  });
});
