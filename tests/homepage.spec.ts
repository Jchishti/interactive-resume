import { test, expect } from '@playwright/test';

test('homepage loads and shows expected content', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Story Resume/i); // or whatever your site's title is
  await expect(page.locator('h1')).toBeVisible(); // adjust if you're using something else
});