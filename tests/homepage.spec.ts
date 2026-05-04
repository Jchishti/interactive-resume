import { test, expect } from '@playwright/test';

test('homepage loads and shows expected content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Story Resume/i);
  // Home page is now the map — verify a nav button is visible
  await expect(page.getByRole('link', { name: /quest log/i })).toBeVisible();
});
