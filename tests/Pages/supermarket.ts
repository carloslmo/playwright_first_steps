import { type Locator, type Page, expect } from "@playwright/test";

export class supermarketPage {

    readonly page: Page;
    readonly usernameSpanishTextBox: Locator;
    readonly cookies: Locator;
    readonly myAccountLink: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    readonly couponLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameSpanishTextBox = page.getByRole('textbox', { name: 'Usuario' });
        this.cookies = page.getByRole('button', { name: 'ACEPTAR' });
        this.myAccountLink = page.getByRole('listitem').nth(3);
        this.inputEmail = page.getByTestId('input-email');
        this.inputPassword = page.getByTestId('login-input-password');
        this.loginButton = page.getByTestId('button-primary');
        this.couponLocator = page.locator("//button//span[contains(text(), 'Activar')]");    
    }

    async clickLoginSpanish() {
        await this.loginButton.click();
    }

    async activateAllCoupons() {
        let msg;
        if(await this.couponLocator.count() == 0){
            msg = 'There are no coupons to activate';
        }else{
            while (await this.couponLocator.count() > 0) {
                await this.couponLocator.first().click();
                await this.page.waitForTimeout(1000);
            }
            msg = '✅ All coupons activated.';
        }
        return msg;
    }
}