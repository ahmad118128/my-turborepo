import { expect, test } from '@playwright/test';

test('TestPage renders and button works', async ({ page }) => {
  // فرض می‌کنیم سرور Next.js روی localhost:3000 اجرا شده
  await page.goto('http://localhost:3000/test-page');

  // بررسی وجود عنوان
  const title = page.locator('[data-testid="title"]');
  await expect(title).toHaveText('Hello E2E Test');

  // کلیک روی دکمه و بررسی alert
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Button clicked!');
    await dialog.dismiss();
  });

  const button = page.locator('[data-testid="click-button"]');
  await button.click();
});
