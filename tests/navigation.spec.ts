// File: tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all nav buttons', async ({ page }) => {
    await expect(page.getByRole('link', { name: /quest log/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /chronicles/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /side quests/i })).toBeVisible();
  });

  test('should navigate to Resume page', async ({ page }) => {
    await page.getByRole('link', { name: /quest log/i }).click();
    await expect(page).toHaveURL(/\/resume/);
    await expect(page.locator('.apple-name')).toContainText(/Jamal Chishti/i);
  });

  test('should navigate to Life Story page', async ({ page }) => {
    await page.getByRole('link', { name: /chronicles/i }).click();
    await expect(page).toHaveURL(/\/story/);
    await expect(page.getByRole('heading', { name: /Prologue/i })).toBeVisible();
  });

  test('should navigate to Side Quests page', async ({ page }) => {
    await page.getByRole('link', { name: /side quests/i }).click();
    await expect(page).toHaveURL(/\/sidequests/);
    await expect(page.locator('h2')).toContainText(/Side Quests/i);
  });
});
