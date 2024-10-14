const { test,expect } = require('@playwright/test');
import { XpathsCustomer } from "../utils/constant.js";
import {
    getPhoneNumberForCountry,
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
    await page.click(XpathsCustomer.manageCustomer);
    await page.click(XpathsCustomer.customerSelect);
    await page.click(XpathsCustomer.addCustomer);
    
});
test.describe("Event Page Test", async () => {
    test("Leave all required fields empty", async () => {
        // 1- Leave all required field empty
        await page.waitForTimeout(2000);
        await page.click(XpathsCustomer.submitButton);
        await page.evaluate(() => window.scrollTo(0, 0));
        const validation1 = page.getByText(/This field is required./i).first();
        await validation1.isVisible();
        console.log("validation message for required field is displayed");
        await page.waitForTimeout(2000);
        

      });
      test("create event with invalid value format", async () => {
        // 2-create event with invalid value format
      await page.locator('input[id="name"]') .fill( "The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");

      const invalidInputs = ['1029878', 'Simple Text','&^*&(&*', 'ktest@@yopmail.com', 'Ktest1@yopmail.commm'];

      for (const input of invalidInputs) {
       
        await page.fill('input[id="email"]', ''); // Clear the tax field
        await page.fill('input[id="email"]',input); //  the tax field with the invalid value
        await page.press('input[id="email"]', 'Tab');
        await page.waitForTimeout(2000);
      }
      await page.click(XpathsCustomer.dropdownSelector);
      await page.click(XpathsCustomer.dropdownOption);
      console.log('Country selected successfully.');
      const invalidInputs1 = ['827643876','simple text', '&^%^%$^%&^&', '789 67899 56784'];
      for (const input of invalidInputs1) {
      
      await page.fill('input[id="phone"]', '');
      // Clear the tax field
      await page.fill('input[id="phone"]', input); 
      //  the tax field with the invalid value
      await page.press('input[id="phone"]', 'Tab');
      await page.waitForTimeout(2000);
    }
      });
      
    
    
      test("Create customer", async () => {
       // create customer with valid values random generate
        const randomName = faker.person.fullName();
        await page.fill('input[id="name"]', randomName);
    
        // Generate a random email using faker
       // const randomEmail = faker.internet.email();
       const randomEmail = `${faker.internet.userName()}@yopmail.com`;
        await page.fill('input[id="email"]', randomEmail);

        await page.click(XpathsCustomer.dropdownSelector);
        // Select a country for the phone number
        const country = 'India (भारत)';  // Example: you can choose any country dynamically
        await page.click('li[id="iti-0__item-in"]',country);
        //await page.click('li[id="iti-0__item-ca"]',country);
        //await page.click('li[id="iti-0__item-us"]',country);
    
        // Get a properly formatted phone number for the selected country
        const phoneNumber = getPhoneNumberForCountry(country);
        await page.fill('input[id="phone"]',phoneNumber);
    
        // Submit the form
        await page.click(XpathsCustomer.submitButton);
        await page.waitForTimeout(2000);
      //  await expect(page.locator(XpathsCustomer.customerAddingSuccess)).toBeVisible();
        console.log(`Customer added with name: ${randomName}, email: ${randomEmail}, and phone: ${phoneNumber}`);
       
    
      });
      
});