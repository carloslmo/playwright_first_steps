import { type Locator, type Page } from "@playwright/test";

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
}