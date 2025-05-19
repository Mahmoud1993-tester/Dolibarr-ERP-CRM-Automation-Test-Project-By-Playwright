import { expect } from "@playwright/test";

export class LoginPage {

    constructor (page) {
        this.page = page;
        this.loginLink = page.locator('div.demothumbtext').first();
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('input.button');
        this.messageAssertion = page.locator('div.menu_titre').first();
    }

    async goto_login_page() {
        await this.page.goto('/');
        await this.loginLink.click();
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async messageAssert(message) {
        await expect(this.messageAssertion).toHaveText(message);
    }
}