// @ts-check
const{test, expect} = require('@playwright/test')
import Tesseract from 'tesseract.js';
import fs from 'fs';
import sharp from 'sharp';
import { AddNewUser } from '../pages/add-new-user';

test("Add New User", async({page})=> {

  const addnewuser = new AddNewUser(page);
  // Navigate to Login 
  await addnewuser.LoginPage();



  // Step 1: Login with credentials
  await page.waitForLoadState('networkidle');
  await addnewuser.LoginData('msaber93.egy@gmail.com', 'Dolibarr@1993');


  // Step 2: Wait for the image with code to appear and take a screenshot
  await addnewuser.captchaImage();
  await page.waitForTimeout(2000);

  const imageBuffer = await addnewuser.imageLocator.screenshot();

 
  // Step 4: Use OCR to read the image 
 const resizedBuffer = await sharp(imageBuffer)
  .resize({ width: 400 , height: 200})
  .grayscale()
  .threshold(128)
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
  await page.waitForTimeout(2000);

  
  // Step 5: Enter the code
  await addnewuser.codeInputField(code);
  await page.waitForTimeout(1000);
  await addnewuser.loginClicKButton();

  // wait 
  await page.waitForLoadState('networkidle');
 



  // Create New User 
  await addnewuser.createNewUser();

  
  // Enter New User 
  await addnewuser.userPersonalInfo('Saber', 'Ahmed', 'Saber9256');
  
  await addnewuser.validatyInfo('05/16/2025', '05/25/2025');
 
  await addnewuser.passwordInfo('01116692166@dolivarr');

  await addnewuser.accomdInfo('Egypt, Cairo', '11765');

  await addnewuser.contactInfo('0553100676', '01116692166', 'yonod11396@daxiake.com');
  
  await addnewuser.jobInfo('Software Test Engineer', '05/25/2025', '05/25/2027');

  await addnewuser.createUserButton();

  // Asseretion User Created
  await page.waitForTimeout(10000);
  await addnewuser.successCreatingAccount();


})