import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow user to log in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('link', { name: "sign in" }).click();

  await expect(page.getByRole("heading", { name: "log in" })).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("Password1234");

  await page.getByRole("button", { name: "log in"}).click();

  await expect(page.getByText("successfully logged in")).toBeVisible();
  await expect(page.getByRole("button", { name: "log out" })).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
  const testNumber = `register_test_${ Math.floor(Math.random() * 90000) + 10000 }`;
  
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "sign in" }).click();
  await page.getByRole("link", { name: "register here" }).click();

  await expect(page.getByRole("heading", { name: "create an account" })).toBeVisible();

  await page.locator("[name=username]").fill(testNumber);
  await page.locator("[name=email]").fill(`${ testNumber }@email.com`);
  await page.locator("[name=password]").fill("Password1234");
  await page.locator("[name=confirmPassword]").fill("Password1234");

  await page.getByRole("button", { name: "create" }).click();

  await expect(page.getByText("registration success")).toBeVisible();
  await expect(page.getByRole("button", { name: "log out" })).toBeVisible();
});