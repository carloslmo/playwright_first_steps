import { test, expect } from '@playwright/test';
import { privateTrackerPage } from './Pages/privatetrackerPage';
import dotenv from "dotenv"

test.describe('Redeem points on private trackers', () => {
  dotenv.config();

  test('Redeem points at HDOlimpo', {
    tag: ['@week', '@hdolimpo']
  }, async ({ page }) => {
    const privateTracker = new privateTrackerPage(page);

    test.info().annotations.push({
      type: 'User story 001',
      description: 'We entered HDOlimpo, checked that we had more than 25,000 points and redeemed them in the store for an extra 1TB to our bag.'
    });

    await test.step('Since I am sailing towards HDOlimpo', async () => {
      await page.goto(process.env.BASE_URL_HDOLIMPO!);
      await expect(page).toHaveTitle('Iniciar sesión - HD-Olimpo');
    });

    await test.step('Login', async () => {
      const username = process.env.HDOLIMPO_USERNAME;
      const password = process.env.HDOLIMPO_PASSWORD;

      if (!username || !password) {
        throw new Error('The credentials are not configured in the file .env');
      }

      await privateTracker.fillSensitive(privateTracker.usernameSpanishTextBox, username);
      await privateTracker.fillSensitive(privateTracker.passwordSpanishTextBox, password);

      await privateTracker.clickLoginSpanish();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('HD-Olimpo - Nueva generación');

        await privateTracker.checkPointsFromBadge();
        const pointsNum = await privateTracker.checkPointsFromBadge();
        let msg;
        if (pointsNum >= 25000) {
          expect(pointsNum).toBeGreaterThan(25000);
          await page.goto(process.env.URL_HDOLIMPO_STORE!);

          // Check price
          await privateTracker.exchange1024GiB();

          // Verify that the error message does NOT appear
          await expect(page.getByRole('dialog', { name: 'Error' }), 'Purchase not completed').not.toBeVisible();
          msg = '✅ Purchase completed without errors';
          console.log(msg);
        } else if (pointsNum < 25000) {
        msg = `Puntos actuales: ${pointsNum}, insuficientes para comprar.`;
        console.log(msg);
      }

      test.info().attach('Finish result', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });

  test('Redeem points at TORRENTLAND', {
    tag: ['@week', '@torrentland']
  }, async ({ page }) => {
    const privateTracker = new privateTrackerPage(page);

    test.info().annotations.push({
      type: 'User story 002',
      description: 'We entered TorrentLand, checked that we had more than 5,000 points and redeemed them in the store for an extra 100gb to our bag.'
    });

    await test.step('Since I am sailing towards TORRENTLAND', async () => {
      await page.goto(process.env.BASE_URL_TORRENTLAND!);
      await expect(page).toHaveTitle('Iniciar sesión - Torrentland');
    });

    await test.step('Login', async () => {
      const username = process.env.TORRENTLAND_USERNAME;
      const password = process.env.TORRENTLAND_PASSWORD;

      if (!username || !password) {
        throw new Error('The credentials are not configured in the file .env');
      }

      await privateTracker.fillSensitive(privateTracker.usernameSpanishTextBox, username);
      await privateTracker.fillSensitive(privateTracker.passwordSpanishTextBox, password);

      await privateTracker.clickLoginSpanish();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('Torrentland - Torrent Tracker');

      await page.goto(process.env.URL_TORRENTLAND_STORE!);
      await expect(page).toHaveTitle('Torrentland - Torrent Tracker');

await privateTracker.exchange500GiB();

      const successAlert = page.getByRole('alert', { name: 'Intercambio de BON realizado' });
      const errorAlert = page.getByLabel('Error').getByText('Not enough BON.');

      let msg;
      // Wait 10 seconds before checking alerts
      await page.waitForTimeout(10000);
      
      if (await successAlert.isVisible()) {
        await expect(successAlert, 'Purchase should be completed').toBeVisible();
        msg = '✅ Purchase completed without errors';
        console.log(msg);
      } else {
        await expect(errorAlert, 'Purchase should NOT be completed').toBeVisible();
        msg = 'Purchase not completed, you are likely missing points';
        console.log(msg);
      }

      test.info().attach('Finish result', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });

  test('Redeem points at YTMonster', {
    tag: ['@daily', '@ytmonster']
  }, async ({ page }) => {
    const privateTracker = new privateTrackerPage(page);

    test.info().annotations.push({
      type: 'User story 003',
      description: 'We went into YTMONSTER, checked that we had more than 200 points and redeemed them.'
    });

    await test.step('Since I am sailing towards YTMONSTER', async () => {
      await page.goto(process.env.BASE_URL_YTMONSTER!);
      await expect(page).toHaveTitle('YTMonster® | Login');
    });

    await test.step('Login', async () => {
      const username = process.env.YTMONSTER_USERNAME;
      const password = process.env.YTMONSTER_PASSWORD;

      if (!username || !password) {
        throw new Error('The credentials are not configured in the file .env');
      }

      await privateTracker.fillSensitive(privateTracker.emailTextField, username);
      await privateTracker.fillSensitive(privateTracker.passwordEnglishTextBox, password);

      await privateTracker.loginEnglishButton.click();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('YTMonster® | Dashboard');

      await privateTracker.earnCreditsLink.click();
      let msg = await privateTracker.redeemPoints();

      test.info().attach('Resultado final', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });

  test('Redeem points at TorrentLeech', {
    tag: ['@week', '@torrentleech']
  }, async ({ page }) => {
    const privateTracker = new privateTrackerPage(page);

    test.info().annotations.push({
      type: 'User story 004',
      description: 'We entered Torrentleech, checked that we had more than 12,000 points and redeemed them in the store for an extra 100gb to our bag.'
    });

    await test.step('Since I am sailing towards TORRENTLEECH', async () => {
      await page.goto(process.env.BASE_URL_TORRENTLEECH!);
      await expect(page).toHaveTitle('Login :: TorrentLeech.org');
    });

    await test.step('Login', async () => {
      const username = process.env.TORRENTLEECH_USERNAME;
      const password = process.env.TORRENTLEECH_PASSWORD;

      if (!username || !password) {
        throw new Error('The credentials are not configured in the file .env');
      }

      await privateTracker.fillSensitive(privateTracker.usernameEnglishTextBox, username);
      await privateTracker.fillSensitive(privateTracker.passwordEnglishAltTextBox, password);

      await privateTracker.clickLoginEnglishAlt();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('TorrentLeech.org');

      await page.goto(process.env.URL_TORRENTLEECH_STORE!);
      await expect(page).toHaveTitle('TorrentLeech.org');

      let msg = await privateTracker.exchange250GiB();

      test.info().attach('Finish result', {
        body: msg,
        contentType: 'text/plain'
      });
    })
  });
});