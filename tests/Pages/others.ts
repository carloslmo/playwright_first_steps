import { type Locator, type Page } from "@playwright/test";

export class othersPage {

    readonly page: Page;
    readonly cookiesChollometro: Locator;
    readonly loginLink: Locator;
    readonly inputEmail: Locator;
    readonly btnContinue: Locator;
    readonly inputPassword: Locator;
    readonly loginButton: Locator;
    readonly levelUpBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookiesChollometro = page.getByRole('button', { name: 'Aceptar todo' });
        this.loginLink = page.getByRole('button', { name: 'Regístrate / Inicia sesión' });
        this.inputEmail = page.getByRole('textbox', { name: 'paco@martinez.com' });
        this.btnContinue = page.getByRole('button', { name: 'Continuar' });
        this.inputPassword = page.getByRole('textbox', { name: '**************' });
        this.loginButton = page.getByRole('button', { name: 'Iniciar sesión' });
        this.levelUpBtn = page.getByRole('button', { name: '¿Buen chollo? ¡Sube su' });
    }

    async clickLoginSpanish() {
        await this.loginButton.click();
    }

    async levelUp() {;
        let msg='';
        const allthebuttom = await this.levelUpBtn.all();
        const firsts4 = allthebuttom.slice(0, 4);

        for (const [index, button] of firsts4.entries()) {
            await button.click();
            msg += `Temperatura = ${index + 1}\n`;
            console.log(msg);
            await this.page.waitForTimeout(1000);
        }

        return msg;
    }
}