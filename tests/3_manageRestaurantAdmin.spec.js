const { test,expect } = require('@playwright/test');
import { XpathsRestAdmin } from "../utils/constant.js";
import {
    getPhoneNumberForCountries,
  } from "../utils/helpers.js";
import { faker } from '@faker-js/faker';
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

let page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.fill("input[id='username']", EMAIL);
    await page.fill("input[id='password']", PASSWORD);
    await page.click("input[Type='submit']");
});
test.beforeEach(async () => {
    await page.waitForTimeout(1000);
    await page.click(XpathsRestAdmin.manageRestaurantAdmin);
    await page.click(XpathsRestAdmin.adminSelect);
    await page.click(XpathsRestAdmin.addAdmin);
    
});
test.describe("Event Page Test", async () => {
    test("Leave all required fields empty", async () => {
        // Submit Button
        await page.waitForTimeout(2000);
        await page.click(XpathsRestAdmin.submitButton);
        await page.evaluate(() => window.scrollTo(0, 0));
        const validation1 = page.getByText(/This field is required./i).first();
        await validation1.isVisible();
        console.log("validation message for required field is displayed");
        await page.waitForTimeout(2000);
    });

    test("create event with invalid value format", async () => {
        // 2-create event with invalid value format
    await page.click(XpathsRestAdmin.restaurantDropdown);
    await page.getByPlaceholder('Search...').fill('the singing tree');
    await page.getByPlaceholder('Search...').press('Enter');
    await page.getByPlaceholder('Search...').press('ArrowDown');
    await page.getByPlaceholder('Search...').press('Enter')
    await page.waitForTimeout(2000);
    await page.click('select[id="role_id"]');
    await page.locator('#form_add_user div').filter({ hasText: 'Restaurant* Please Select' }).first().click();
    await page.locator('#role_id').selectOption('10507');
    await page.locator('input[id="name"]') .fill( "The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");
    
    const invalidInputs = ['1029878', 'Simple Text','&^*&(&*', 'ktest@@yopmail.com', 'Ktest1@yopmail.commm'];

    for (const input of invalidInputs) {
     
      await page.fill('input[id="email"]', ''); // Clear the tax field
      await page.fill('input[id="email"]',input); //  the tax field with the invalid value
      await page.press('input[id="email"]', 'Tab');
      await page.waitForTimeout(2000);
    }
    await page.locator('input[id="phone"]');
    const invalidInputs1 = ['827643876','simple text', '&^%^%$^%&^&', '789 67899 56784'];
    for (const input of invalidInputs1) {
    
    await page.fill('input[id="phone"]', '');
    // Clear the tax field
    await page.fill('input[id="phone"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="phone"]', 'Tab');
    await page.waitForTimeout(2000);
  }

  await page.locator('input[id="password"]');
  const invalidInputs2 = ['8','1234', '12345'];
  for (const input of invalidInputs2) {
  
  await page.fill('input[id="password"]', '');
  // Clear the tax field
  await page.fill('input[id="password"]', input); 
  //  the tax field with the invalid value
  await page.press('input[id="password"]', 'Tab');
  await page.waitForTimeout(2000);
}
await page.locator('input[id="confirm_password"]');
const invalidInputs3 = ['8','1234', '1234567'];
for (const input of invalidInputs3) {

await page.fill('input[id="confirm_password"]', '');
// Clear the tax field
await page.fill('input[id="confirm_password"]', input); 
//  the tax field with the invalid value
await page.press('input[id="confirm_password"]', 'Tab');
await page.waitForTimeout(2000);
}
 

});
test("Create customer", async () => {
  
await page.click(XpathsRestAdmin.restaurantDropdown);
await page.getByPlaceholder('Search...').fill('the singing tree');
await page.getByPlaceholder('Search...').press('Enter');
await page.getByPlaceholder('Search...').press('ArrowDown');
await page.getByPlaceholder('Search...').press('Enter')
await page.waitForTimeout(2000);
await page.click('select[id="role_id"]');
await page.locator('#form_add_user div').filter({ hasText: 'Restaurant* Please Select' }).first().click();
await page.locator('#role_id').selectOption('10507');

const randomName = faker.person.fullName();
await page.fill('input[id="name"]', randomName);   

//   Email Address
await page.locator("#email").fill(`${faker.internet.email({ provider: "yopmail.com" })}`);
//   Contact Number
await page.click(XpathsRestAdmin.dropdownSelector);
// Select a country for the phone number
const country = 'Canada';  // Example: you can choose any country dynamically
//await page.click('li[id="iti-0__item-in"]',country);
await page.click('li[id="iti-0__item-ca"]',country);
//await page.click('li[id="iti-0__item-us"]',country);

// Get a properly formatted phone number for the selected country
const adminPhoneNumber = getPhoneNumberForCountries(country);
await page.fill('input[type="tel"]',adminPhoneNumber);
const password = 'Test@123';
const confirmPassword = 'Test@123';
await page.fill('input[id="password"]', password);
await page.fill('input[id="confirm_password"]', confirmPassword);

if (confirmPassword !== password) {
   await page.getByText("Please enter the same value again.").isVisible();
   console.log("confirm password does not match password");
    }
    else
    {
    console.log("password and confirm password match successfully");
    }

  await page.click(XpathsRestAdmin.submitButton);
  await page.waitForTimeout(3000);
  await expect(
    page.locator(XpathsRestAdmin.adminAddSuccess)
  ).toBeVisible();
  });

});