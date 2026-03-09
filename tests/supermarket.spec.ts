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

    test.setTimeout(240000);

    await test.step('Since I am sailing towards LIDL', async () => {
      await utils.gotoWeb(process.env.BASE_URL_LIDL!,'Compra Online | Lidl');
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

      await supermarket.cookiesX.click();
      await utils.fillSensitive(supermarket.inputEmail, username);
      await utils.fillSensitive(supermarket.inputPassword, password);
      await supermarket.clickLoginSpanish();
      await utils.waitForTimeout(10);

      const maxRetries = 10;
      let attempts = 0;
      while (await supermarket.alertLogin.isVisible() && attempts < maxRetries) {
        await utils.fillSensitive(supermarket.inputPassword, password);
        await supermarket.clickLoginSpanish();
        await utils.waitForTimeout(15);
        attempts++;
      }
});

    await test.step('Since we checked the points', async () => {
      await utils.gotoWeb(process.env.URL_LIDL_STORE!,'My Lidl Account');

      let msg = await supermarket.activateAllCoupons();

      test.info().attach('Finish result', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });
});