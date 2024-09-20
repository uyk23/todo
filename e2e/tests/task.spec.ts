import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "sign in" }).click();

  await expect(page.getByRole("heading", { name: "log in" })).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("Password1234");

  await page.getByRole("button", { name: "log in" }).click();

  await expect(page.getByText("successfully logged in")).toBeVisible();
  await expect(page.getByRole("button", { name: "log out" })).toBeVisible();
});

test("should allow user to add a task", async ({ page }) => {
  const timestamp = new Date();

  await page.goto(`${UI_URL}`);

  await page.getByRole("button", { name: "add tasks" }).click();

  await page.locator("[name=title]").fill(`test: ${timestamp}`);

  await page.locator(':nth-match(:text("today"), 2)').click();

  await page.getByRole("button", { name: "save" }).click();

  await expect(page.getByText("task saved")).toBeVisible();
  await expect(page.getByText(`test: ${timestamp}`)).toBeVisible();
});
