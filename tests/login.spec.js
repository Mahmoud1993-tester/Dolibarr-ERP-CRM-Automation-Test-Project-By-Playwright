// @ts-check
const {test, expect} = require ('@playwright/test');
import { LoginPage } from '../pages/login-page';

test("Valid Login", async({page}) => {
    // Navigate to Login Page
    const loginpage = new LoginPage(page);
    await loginpage.goto_login_page();
    await expect(page).toHaveURL(/urlfrom/);

    // Login Page 
    await loginpage.login('demo', 'demo');

    // Wait Profile Page 
    await page.waitForTimeout(5000);

    // Profile Page check
    await expect(page).toHaveURL(/mainmenu=home/);
    await loginpage.messageAssert("My Dashboard");

} )