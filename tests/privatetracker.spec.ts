import { test, expect } from '@playwright/test';
import { privateTrackerPage } from './Pages/privatetrackerPage';
import dotenv from "dotenv"

test.describe('Redeem points on private trackers', () => {
  dotenv.config();

  test('Redeem points at HDOlimpo', async ({ page }) => {
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

      await privateTracker.usernameTextBox.fill(username);
      await privateTracker.passwordTextBox.fill(password);
      await privateTracker.clickLoginV1();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('HD-Olimpo - Nueva generación');

      await privateTracker.checkPointsV1();
      const pointsNum = await privateTracker.checkPointsV1();

      if (pointsNum >= 15000) {
        expect(pointsNum).toBeGreaterThan(15000);
        await page.goto(process.env.URL_HDOLIMPO_STORE!);

        // Check price
        await privateTracker.buy1TB();

        // Wait for a modal to appear (success or failure)
        await page.waitForSelector('.swal2-popup', { timeout: 10000 });
        
        // Verify that the error message does NOT appear
        await expect(page.getByRole('dialog', { name: 'Error' }), 'Purchase not completed').not.toBeVisible();
        console.log('✅ Purchase completed without errors');
      } else if (pointsNum < 25000) {
        console.log(`Puntos actuales: ${pointsNum}`);
      }
    })
  });

  test('Redeem points at TORRENTLAND', async ({ page }) => {
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

      await privateTracker.usernameTextBox.fill(username);
      await privateTracker.passwordTextBox.fill(password);
      await privateTracker.clickLoginV1();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('Torrentland - Torrent Tracker');

      await page.goto(process.env.URL_TORRENTLAND_STORE!);
      await expect(page).toHaveTitle('Torrentland - Torrent Tracker');

      await privateTracker.buy500GB(); 

      const successAlert = page.getByRole('alert', { name: 'Intercambio de BON realizado' });
      const errorAlert   = page.getByLabel('Error').getByText('Not enough BON.');

      if (await successAlert.isVisible()) {
        await expect(successAlert, 'Purchase should be completed').toBeVisible();
        console.log('✅ Purchase completed without errors');
      } else {
        await expect(errorAlert, 'Purchase should NOT be completed').toBeVisible();
        console.log('Purchase not completed, you are likely missing points');
      }

    })
  });

  test('Redeem points at YTMonster', async ({ page }) => {
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

      await privateTracker.emailTextBox.fill(username);
      await privateTracker.passwordTextBox2.fill(password);
      await privateTracker.loginButton2.click();
    });

    await test.step('Since we checked the points', async () => {
      await expect(page).toHaveTitle('YTMonster® | Dashboard');

      await privateTracker.earnCreditsLink.click();
      await privateTracker.redeemYT(); 
    })
  });

});