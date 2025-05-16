// @ts-check
const{test, expect} = require('@playwright/test')
import Tesseract from 'tesseract.js';
import fs from 'fs';
import sharp from 'sharp';

test("Add New User", async({page})=> {
  // Navigate to Login 
  await page.goto('https://ieasoft.mgc01.ma-gestion-cloud.fr');

  // Step 1: Login with credentials
  await page.fill('#username', 'msaber93.egy@gmail.com');
  await page.fill('#password', 'Dolibarr@1993');


  // Step 2: Wait for the image with code to appear
  const imageLocator = page.locator('#img_securitycode'); 
  await imageLocator.waitFor();
  await page.waitForTimeout(2000);
 

  // Step 3: Take screenshot of the image
  const imageBuffer = await imageLocator.screenshot();

 
  // Step 4: Use OCR to read the image 
  const resizedBuffer = await sharp(imageBuffer)
  .resize({ width: 500 })
  .grayscale()
  .sharpen()
  .normalize()
  .toBuffer();

  fs.writeFileSync('captcha-resized.png', resizedBuffer);

  const result = await Tesseract.recognize('captcha-resized.png', 'eng');

  const rawText = result.data.text;
  const code = rawText.replace(/[^a-zA-Z0-9]/g, '').trim();

  console.log('OCR Raw:', rawText);
  console.log('Cleaned Code:', code);

  // Wait 
  await page.waitForTimeout(5000);

  // Step 5: Enter the code
  await page.fill('#securitycode', code);
  await page.waitForTimeout(1000);
  await page.click('input[type="submit"]');

  // wait 
  await page.waitForLoadState('networkidle');
 



  // Create New User 
  await page.click("//a[@title='Users & Groups']"); // click Users Section
  await page.click("//a[@title='New user']"); // Click New User
  
  // Enter New User Info
  await page.selectOption("#civility_code", 'MR'); // Title Selection
  await page.fill("#lastname", "Saber"); // Last Name 
  await page.fill("#firstname", "Mahmoud");  // First Name

  await page.fill("#login", "Saber2025") // Login Name
  await page.selectOption("#gender", 'man'); // Gender Selection

  await page.selectOption("#fk_user", "AdminUser"); // Supervisor 

  await page.fill("#datestartvalidity", "05/16/2025"); // Date Start Validity
  await page.fill("#dateendvalidity", "05/25/2025");   // Date End Validity

  await page.fill("#password", "01116692166@dolibarr"); // Password

  await page.fill("#address", "Egypt, Cairo"); // Address
  await page.fill("#zipcode", "11765");        // Zipcode

  await page.selectOption("#selectcountry_id", "28");  // Country Selection
  await page.selectOption("#state_id", "ACT - Australia Capital Territory"); // State Selection
  await page.fill("//input[@name='office_phone']", "0553100676");   // Office Phone
  await page.fill("//input[@name='user_mobile']", "01116692166");   // Mobile Number
  await page.fill("//input[@name='email']", "wirok68052@daupload.com");   // E-mail

  await page.fill("//input[@name='job']", "Software Test Engineer"); // Job Title
  await page.fill("#dateemployment", "05/25/2025");    // Employment Start Date
  await page.fill("#dateemploymentend", "05/25/2027"); // Employment End Date

  await page.click("//input[@name='save']");  // Click Create Account Button 

  // wait 
  await page.waitForTimeout(5000);


} )