// @ts-check
const {test, expect} = require('@playwright/test')

test ("Invalid Login", async({page}) => {
    // Navigate to Login Page
    await page.goto('/')
    await page.click("div.demothumbtext")

    // Login Page 
    await page.fill("#username", "wronguser")
    await page.fill("#password", "wronguser")
    await page.locator("input.button").click()

    // Wait Profile Page 
    await page.waitForTimeout(5000)

    // Check the Invalid Login Message Is Displayed 
    const invalidMessage = page.locator('div.jnotify-message > div')
    await expect(invalidMessage).toHaveText("Bad value for login or password")



})