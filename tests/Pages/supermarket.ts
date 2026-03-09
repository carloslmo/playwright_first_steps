import { type Locator, type Page, expect } from "@playwright/test";
import { utilsPage } from "./utils";

export class supermarketPage {

    readonly page: Page;
    readonly usernameSpanishTextBox: Locator;
    readonly cookies: Locator;
    readonly cookiesX: Locator;
    readonly alertLogin: Locator;
    readonly myAccountLink: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    readonly couponLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameSpanishTextBox = page.getByRole('textbox', { name: 'Usuario' });
        this.cookies = page.getByRole('button', { name: 'ACEPTAR' });
        this.cookiesX = page.getByRole('button', { name: 'X' });
        this.alertLogin = page.getByText('Estamos por encima de nuestra');
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
        let msg,total;
        if(await this.couponLocator.count() == 0){
            msg = 'There are no coupons to activate';
        }else{
            while (await this.couponLocator.count() > 0) {
                total = await this.couponLocator.count();
                await this.couponLocator.first().click();
                await this.page.waitForTimeout(5000);
            }
            msg = '✅ All coupons activated.Total is: ' + total;
        }
        return msg;
    }
}