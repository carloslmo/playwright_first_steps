import { type Locator, type Page, expect } from "@playwright/test";

export class privateTrackerPage {

    readonly page: Page;
    readonly usernameTextBox: Locator;
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly passwordTextBox2: Locator;
    readonly loginButton: Locator;    
    readonly loginButton2: Locator;
    readonly bonusButton: Locator;
    readonly bonusButton2: Locator;
    readonly upload1024Button: Locator;
    readonly buy1tbButton: Locator;
    readonly buy500gbButton: Locator;
    readonly earnCreditsLink: Locator;
    readonly redeemYTLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextBox = page.getByRole('textbox', { name: 'Usuario' });
        this.emailTextBox = page.getByText('Email');
        this.passwordTextBox = page.getByRole('textbox', { name: 'Contraseña' });
        this.passwordTextBox2 = page.getByText('Password', { exact: true });
        this.loginButton = page.getByRole('button', { name: 'Iniciar sesión' });
        this.loginButton2 = page.getByRole('button', { name: 'Login' });
        this.bonusButton = page.locator('xpath=//span[@class="badge-user text-bold"][.//a[contains(@href, "bonus")]]');
        this.bonusButton2 = page.locator('xpath=.//section[contains(@class, "panelV2")]//div');
        this.upload1024Button = page.locator('xpath=//tr[contains(., "1024 GiB (1 TiB) Upload")]');
        this.buy1tbButton = this.upload1024Button.locator('xpath=.//button[contains(@class, "btn-exchange")]');
        this.buy500gbButton = page.getByRole('row', { name: 'GiB de Subida 5000 Comprar' }).getByRole('button');
        this.earnCreditsLink = page.getByRole('link', { name: 'Earn Credits', exact: true });
        this.redeemYTLink = page.getByRole('link', { name: 'Redeem' });
    }

    async clickLoginV1() {
        await this.loginButton.click();
    }

    async clickLoginV2() {
        await this.loginButton2.click();
    }

    async checkPointsV1() {
        // Obtain the full span containing the points and clean it up a bit to display the current points on the console.
        const textComplete = await this.bonusButton.textContent();
        const numStr = textComplete?.trim().match(/(\d+)/)?.[1];
        const numPoints = Number(numStr);

        console.log(`Current points: ${numPoints}`);
        return numPoints;
    }

    async checkPointsV2() {
        const textComplete = await this.bonusButton2.textContent;
        console.log(`Current points: ${textComplete}`);

        return textComplete;
    }

    async buy1TB() {
        await expect(this.upload1024Button).toBeVisible();
        const price = await this.upload1024Button.locator('xpath=.//td[2]').textContent();
        expect(price?.trim()).toBe('25000');
        await this.buy1tbButton.click();
    }

    async buy500GB(){
        await expect(this.buy500gbButton).toBeVisible;
        await this.buy500gbButton.click();
    }

    async redeemYT() {
        await expect(
            this.redeemYTLink,
            'The YouTube redemption link is NOT visible'
        ).toBeVisible();

        await this.redeemYTLink.click();
        console.log('✅ Purchase completed without errors');
    }
}