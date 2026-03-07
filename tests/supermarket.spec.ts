import { test, expect } from '@playwright/test';
import { utilsPage } from './Pages/utils';
import { supermarketPage } from './Pages/supermarket';
import dotenv from "dotenv"

test.describe('Activate coupons at supermarkets', () => {
  dotenv.config();

  test('Activate coupons Lidl', {
    tag: ['@week', '@Lidl']
  }, async ({ page }) => {
    const supermarket = new supermarketPage(page);
    const utils = new utilsPage(page);

    test.info().annotations.push({
      type: 'User story 005',
      description: 'We went into LIDL and activated all the coupons.'
    });

    await test.step('Since I am sailing towards LIDL', async () => {
      await page.goto(process.env.BASE_URL_LIDL!);
      await expect(page).toHaveTitle('Compra Online | Lidl');
      await supermarket.cookies.click();
      await supermarket.myAccountLink.click();
    });

    await test.step('Login', async () => {
      await expect(page).toHaveTitle('Lidl Plus Account - Iniciar Sesión');
      const username = process.env.LIDL_USERNAME;
      const password = process.env.LIDL_PASSWORD;

      if (!username || !password) {
        throw new Error('The credentials are not configured in the file .env');
      }

      await utils.fillSensitive(supermarket.inputEmail, username);
      await utils.fillSensitive(supermarket.inputPassword, password);

      await supermarket.clickLoginSpanish();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('My Lidl Plus Account');
      await page.goto(process.env.URL_LIDL_STORE!);
      await expect(page).toHaveTitle('My Lidl Account');
      await page.waitForTimeout(5000);

      let msg = await supermarket.activateAllCoupons();

      test.info().attach('Finish result', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });
});