import {expect} from '@playwright/test';

export class AddNewUser {
    constructor (page) {
        this.page = page;

        // Login Data and Action
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.imageLocator = page.locator('#img_securitycode');
        this.codeInput = page.locator('#securitycode');
        this.loginButton = page.locator('input[type="submit"]');

        // Click User Section
        this.userSection = page.locator("//a[@title='Users & Groups']");
        this.newUserLink = page.locator("//a[@title='New user']");

        // Enter Personal Info
        this.title = page.locator('#civility_code');
        this.lastName = page.locator('#lastname');
        this.firstName = page.locator('#firstname');
        this.loginName = page.locator('#login');
        this.gender = page.locator('#gender');
        this.supervisor = page.locator('#fk_user');

        // Date Validity 
        this.startDate = page.locator('#datestartvalidity');
        this.endDate = page.locator('#dateendvalidity');
        
   
        // User Password
        this.userPassword = page.locator('#password');

        // Contact Info
        this.address = page.locator('#address');
        this.zipcode = page.locator('#zipcode');
        this.country = page.locator('#selectcountry_id');
        this.state = page.locator('#state_id');
        this.officePhone = page.locator("//input[@name='office_phone']");
        this.mobileNumber = page.locator("//input[@name='user_mobile']");
        this.email = page.locator("//input[@name='email']");

        // Job Inof
        this.jobTitle = page.locator("//input[@name='job']");
        this.employmentStartDate = page.locator("#dateemployment");
        this.employmentEndtDate = page.locator("#dateemploymentend");

        // Create User Button
        this.createButton = page.locator("//input[@name='save']");

        // New User Message
        this.userMessage = page.locator('div.jnotify-message > div');
    }

    async LoginPage() {
        await this.page.goto('https://ieasoft.mgc01.ma-gestion-cloud.fr');
    }

    async LoginData(username, password) {
       await this.usernameField.fill(username);
       await this.passwordField.waitFor({ state: 'visible' });
       await this.passwordField.fill(password);
    }

    async captchaImage() {
        await this.imageLocator.waitFor();

    }


    async codeInputField(code) {
        await this.codeInput.fill(code);
    }

    async loginClicKButton() {
        await this.loginButton.click();
    }

    async createNewUser() {
        await this.userSection.click();
        await this.newUserLink.click();
    }

    async userPersonalInfo(lastname, firstname, logname) {
        await this.title.selectOption('MR');
        await this.lastName.fill(lastname);
        await this.firstName.fill(firstname);
        await this.loginName.fill(logname);
        await this.gender.selectOption('man');
        await this.supervisor.selectOption('AdminUser');
    }

    async validatyInfo(start, end) {
        await this.startDate.fill(start);
        await this.endDate.fill(end);
    }

    async passwordInfo(passuser) {
        await this.userPassword.fill(passuser);
    }

    async accomdInfo(addrss, zipco) {
       await this.address.fill(addrss);
       await this.zipcode.fill(zipco);
       await this.country.selectOption('28');
       await this.state.selectOption('ACT - Australia Capital Territory');
    }

    async contactInfo(officeno, mobileno, mail) {
      await this.officePhone.fill(officeno);
      await this.mobileNumber.fill(mobileno);
      await this.email.fill(mail);
    }

    async jobInfo(jtitle, empstart, empend) {
      await this.jobTitle.fill(jtitle);
      await this.employmentStartDate.fill(empstart);
      await this.employmentEndtDate.fill(empend);
    }

    async createUserButton() {
      await this.createButton.click();
    }

    async successCreatingAccount() {
      await expect(this.page).toHaveURL(/.*user\/card\.php/);
      await expect(this.userMessage).toBeVisible();
    }


}