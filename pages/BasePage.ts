import { Page } from "@playwright/test";

export default class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitUntilPageIsLoaded() {
    await this.page.waitForEvent("domcontentloaded");
  }
  async Navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }
  async getText(selector: string): Promise<string> {
    const locator = this.page.locator(selector);
    const text = (await locator.innerText()).trim();
    return text;
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  async waitForElement(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: "visible" });
  }
}
