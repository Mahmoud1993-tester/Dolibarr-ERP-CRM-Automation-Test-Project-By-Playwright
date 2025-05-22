// @ts-check
const {test, expect} = require('@playwright/test');
import { InvalidLogin } from '../pages/invalid-login';

test ("Invalid Login", async({page}) => {

    const invalidLogin = new InvalidLogin(page);
    // Navigate to Login Page
    await invalidLogin.loginPage();

    // Login Page 
    await invalidLogin.login('wronguser', 'wronguser');
    await invalidLogin.loginButtonSubmit();

    // Wait Profile Page 
    await page.waitForTimeout(5000);

    // Check the Invalid Login Message Is Displayed 
    await invalidLogin.errorMessage("Bad value for login or password");



})