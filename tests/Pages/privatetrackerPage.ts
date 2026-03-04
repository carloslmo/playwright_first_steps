import { type Locator, type Page, expect } from "@playwright/test";

export class privateTrackerPage {

    readonly page: Page;
    readonly usernameTextBox: Locator;
    readonly username2: Locator;
    readonly emailTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly passwordTextBox2: Locator;
    readonly passwordTextBox3: Locator;
    readonly loginButton: Locator;    
    readonly loginButton2: Locator;
    readonly loginButton3: Locator;
    readonly bonusButton: Locator;
    readonly bonusButton2: Locator;
    readonly upload1024Button: Locator;
    readonly buy1tbButton: Locator;
    readonly buy500gbButton: Locator;
    readonly buy250gbButton: Locator;
    readonly btnExchange: Locator;
    readonly earnCreditsLink: Locator;
    readonly redeemYTLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextBox = page.getByRole('textbox', { name: 'Usuario' });
        this.username2 = page.getByRole('textbox', { name: 'Username' });
        this.emailTextBox = page.getByLabel('Email');
        this.passwordTextBox = page.getByRole('textbox', { name: 'Contraseña' });
        this.passwordTextBox2 = page.getByLabel('Password', { exact: true });
        this.passwordTextBox3 = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Iniciar sesión' });
        this.loginButton2 = page.getByRole('button', { name: 'Login' });
        this.loginButton3 = page.getByRole('button', { name: 'Log in' });
        this.bonusButton = page.locator('xpath=//span[@class="badge-user text-bold"][.//a[contains(@href, "bonus")]]');
        this.bonusButton2 = page.locator('xpath=.//section[contains(@class, "panelV2")]//div');
        this.upload1024Button = page.locator('xpath=//tr[contains(., "1024 GiB (1 TiB) Upload")]');
        this.buy1tbButton = this.upload1024Button.locator('xpath=.//button[contains(@class, "btn-exchange")]');
        this.buy500gbButton = page.getByRole('row', { name: 'GiB de Subida 5000 Comprar' }).getByRole('button');
        this.buy250gbButton = page.getByRole('button', { name: 'Exchange Points' }).nth(5);
        this.btnExchange = page.getByRole('button', { name: 'Exchange', exact: true });
        this.earnCreditsLink = page.getByRole('link', { name: 'Earn Credits', exact: true });
        this.redeemYTLink = page.getByRole('link', { name: 'Redeem' });
    }

    async clickLoginV1() {
        await this.loginButton.click();
    }

    async clickLoginV2() {
        await this.loginButton2.click();
    }

    async clickLoginV3() {
        await this.loginButton3.click();
    }

    async checkPointsV1() {
        // Obtain the full span containing the points and clean it up a bit to display the current points on the console.
        const textComplete = await this.bonusButton.textContent();
        const numStr = textComplete?.trim().match(/(\d+)/)?.[1];
        const numPoints = Number(numStr);
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

    async buy250GB(){
        await expect(this.buy250gbButton).toBeEnabled;
        const enabled = await this.buy250gbButton.isEnabled();
        let msg;
        if(enabled){
            await this.buy250gbButton.click(); 
            await this.btnExchange.click();
            if(await this.page.getByText('SuccessYour purchase has been').isVisible()){
                msg = '✅ Purchase completed without errors';
            }
        } else {
            msg = '❌ Have we already redeemed the points or havent reached them yet'
        }
        return msg;
    }

    async redeemYT() {
        let msg;
        if (await this.redeemYTLink.isVisible()) {
            await this.redeemYTLink.click();
            msg = '✅ Purchase completed without errors';
        } else {
            msg = '❌ Have we already redeemed the points or havent reached them yet'
        }
        return msg;
    }

    async fillSensitive(locator: Locator, value: string) {
        await locator.evaluate((el, val) => {
          const input = el as HTMLInputElement;
          const nativeInputSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set;
          nativeInputSetter?.call(input, val);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
    }
}