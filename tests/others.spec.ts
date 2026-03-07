import { test, expect } from '@playwright/test';
import { utilsPage } from './Pages/utils';
import { othersPage } from './Pages/others';
import dotenv from "dotenv"

test.describe('Level up points in Chollometro', () => {
  dotenv.config();

  test('Points chollometro', {
    tag: ['@week', '@chollometro']
  }, async ({ page }) => {
    const others = new othersPage(page);
    const utils = new utilsPage(page);

    test.info().annotations.push({
      type: 'User story 006',
      description: 'We went into Chollometro and turned up the heat on the bargains.'
    });

    await test.step('Since I am sailing towards chollometro', async () => {
      await page.goto(process.env.BASE_URL_CHOLLOMETRO!);
      await expect(page).toHaveTitle('Chollos, ofertas y cupones ⇒ Chollometro.com » Nº1 en España');
      await page.waitForTimeout(3000);
      await others.cookiesChollometro.click();
      await page.waitForTimeout(3000);
      await others.loginLink.click();
    });

    await test.step('Login chollometro', async () => {
      const username = process.env.CHOLLOMETRO_USERNAME;
      const password = process.env.CHOLLOMETRO_PASSWORD;

      if (!username || !password) {
        throw new Error('The credentials are not configured in the file .env');
      }

      await utils.fillSensitive(others.inputEmail, username);
      await others.btnContinue.click();
      await utils.fillSensitive(others.inputPassword, password);

      await others.clickLoginSpanish();
    });

    await test.step('Weve turned up the heat on the bargains', async () => {
      await expect(page).toHaveTitle('(99+) Chollos, ofertas y cupones ⇒ Chollometro.com » Nº1 en España');
      await page.waitForTimeout(5000);

      let msg = await others.levelUp();

      test.info().attach('Finish result', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });
});