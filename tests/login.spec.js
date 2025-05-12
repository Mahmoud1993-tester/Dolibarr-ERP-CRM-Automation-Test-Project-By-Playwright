// @ts-check
const {test, expect} = require ('@playwright/test')

test("Valid Login", async({page}) => {
    // Navigate to Login Page
    await page.goto('/')
    await page.click("div.demothumbtext")
    await expect(page).toHaveURL(/urlfrom/)

    // Login Page 
    await page.fill("#username", "demo")
    await page.fill("#password", "demo")
    await page.locator("input.button").click()

    // Wait Profile Page 
    await page.waitForTimeout(5000)

    // Profile Page check
    await expect(page).toHaveURL(/mainmenu=home/)
    const dashboardCheck = page.locator("div.menu_titre").first()
    await expect(dashboardCheck).toHaveText("My Dashboard")

} )