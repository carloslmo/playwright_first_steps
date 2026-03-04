import { type Locator, type Page, expect } from "@playwright/test";

export class privateTrackerPage {

    readonly page: Page;
    readonly usernameSpanishTextBox: Locator;
    readonly usernameEnglishTextBox: Locator;
    readonly emailTextField: Locator;
    readonly passwordSpanishTextBox: Locator;
    readonly passwordEnglishTextBox: Locator;
    readonly passwordEnglishAltTextBox: Locator;
    readonly loginSpanishButton: Locator;    
    readonly loginEnglishButton: Locator;
    readonly loginEnglishAltButton: Locator;
    readonly bonusPointsBadge: Locator;
    readonly bonusPointsSection: Locator;
    readonly uploadCapacityRow1024GiB: Locator;
    readonly exchange1024GiBButton: Locator;
    readonly exchange500GiBButton: Locator;
    readonly exchange250GiBButton: Locator;
    readonly exchangePointsButton: Locator;
    readonly earnCreditsLink: Locator;
    readonly redeemPointsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameSpanishTextBox = page.getByRole('textbox', { name: 'Usuario' });
        this.usernameEnglishTextBox = page.getByRole('textbox', { name: 'Username' });
        this.emailTextField = page.getByLabel('Email');
        this.passwordSpanishTextBox = page.getByRole('textbox', { name: 'Contraseña' });
        this.passwordEnglishTextBox = page.getByLabel('Password', { exact: true });
        this.passwordEnglishAltTextBox = page.getByRole('textbox', { name: 'Password' });
        this.loginSpanishButton = page.getByRole('button', { name: 'Iniciar sesión' });
        this.loginEnglishButton = page.getByRole('button', { name: 'Login' });
        this.loginEnglishAltButton = page.getByRole('button', { name: 'Log in' });
        this.bonusPointsBadge = page.locator('xpath=//span[@class="badge-user text-bold"][.//a[contains(@href, "bonus")]]');
        this.bonusPointsSection = page.locator('xpath=.//section[contains(@class, "panelV2")]//div');
        this.uploadCapacityRow1024GiB = page.locator('xpath=//tr[contains(., "1024 GiB (1 TiB) Upload")]');
        this.exchange1024GiBButton = this.uploadCapacityRow1024GiB.locator('xpath=.//button[contains(@class, "btn-exchange")]');
        this.exchange500GiBButton = page.getByRole('row', { name: 'GiB de Subida 5000 Comprar' }).getByRole('button');
        this.exchange250GiBButton = page.getByRole('button', { name: 'Exchange Points' }).nth(5);
        this.exchangePointsButton = page.getByRole('button', { name: 'Exchange', exact: true });
        this.earnCreditsLink = page.getByRole('link', { name: 'Earn Credits', exact: true });
        this.redeemPointsLink = page.getByRole('link', { name: 'Redeem' });
    }

    async clickLoginSpanish() {
        await this.loginSpanishButton.click();
    }

    async clickLoginEnglish() {
        await this.loginEnglishButton.click();
    }

    async clickLoginEnglishAlt() {
        await this.loginEnglishAltButton.click();
    }

    async checkPointsFromBadge() {
        // Obtain the full span containing the points and clean it up a bit to display the current points on the console.
        const textComplete = await this.bonusPointsBadge.textContent();
        const numStr = textComplete?.trim().match(/(\d+)/)?.[1];
        const numPoints = Number(numStr);
        return numPoints;
    }

    async checkPointsFromSection() {
        const textComplete = await this.bonusPointsSection.textContent;
        console.log(`Current points: ${textComplete}`);

        return textComplete;
    }

    async exchange1024GiB() {
        await expect(this.uploadCapacityRow1024GiB).toBeVisible();
        const price = await this.uploadCapacityRow1024GiB.locator('xpath=.//td[2]').textContent();
        expect(price?.trim()).toBe('25000');
        await this.exchange1024GiBButton.click();
    }

    async exchange500GiB(){
        await expect(this.exchange500GiBButton).toBeVisible;
        await this.exchange500GiBButton.click();
    }

    async exchange250GiB(){
        await expect(this.exchange250GiBButton).toBeEnabled;
        const enabled = await this.exchange250GiBButton.isEnabled();
        let msg;
        if(enabled){
            await this.exchange250GiBButton.click(); 
            await this.exchangePointsButton.click();
            if(await this.page.getByText('SuccessYour purchase has been').isVisible()){
                msg = '✅ Purchase completed without errors';
            }
        } else {
            msg = '❌ Have we already redeemed the points or havent reached them yet'
        }
        return msg;
    }

    async redeemPoints() {
        let msg;
        if (await this.redeemPointsLink.isVisible()) {
            await this.redeemPointsLink.click();
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