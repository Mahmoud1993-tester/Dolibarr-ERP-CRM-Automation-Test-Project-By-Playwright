import {expect} from '@playwright/test';

export class InvalidLogin {
    constructor (page) {
        this.page = page;
        this.loginLink = page.locator('div.demothumbtext').first();
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator('input.button');
        this.invalidMessage = page.locator('div.jnotify-message > div');
    }

     async loginPage() {
        await this.page.goto('/');
        await this.loginLink.click();
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async loginButtonSubmit() {
        await this.loginButton.click();
    }

    async errorMessage(message) {
        await expect(this.invalidMessage).toHaveText(message);
    }


}