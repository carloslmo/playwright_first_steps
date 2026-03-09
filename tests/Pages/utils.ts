import { type Locator, type Page, expect } from "@playwright/test";

export class utilsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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

    async waitWebLoad(){
      await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    }

    async gotoWeb(website:string,title:string){
      await this.page.goto(website);
      await this.waitForTimeout(10);
      await expect(this.page).toHaveTitle(title);
    }

    async gotoWebWithoutTitle(website:string){
      await this.page.goto(website);
      await this.waitForTimeout(10);
    }

    async waitForTimeout(seconds: number) {
      await this.page.waitForTimeout(seconds * 1000);
    }

    async checkTitleURL(title: string) {
      await expect(this.page).toHaveTitle(title);
    }

}