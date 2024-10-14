const { test,expect } = require('@playwright/test');
import { XpathsEvent } from "../utils/constant.js";
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
    await page.click(XpathsEvent.eventManagement);
    await page.click(XpathsEvent.manageEvents);
    await page.click(XpathsEvent.addEvent);
    /*await page.locator('a').filter({ hasText: 'Voucher Book' }).click();
    await page.getByRole('link', { name: 'Manage Events' }).click();
    await page.getByRole('link', { name: 'Add Event' }).click();*/
    
    
});
test.describe("Event Page Test", async () => {
    // 1 - Click on Submit Button without fill  any Fields
  test("Leave all required fields empty", async () => {
    // Submit Button
    await page.waitForTimeout(2000);
    await page.click(XpathsEvent.submitButton);
    await page.evaluate(() => window.scrollTo(0, 0));
    const validation1 = page.getByText(/This field is required./i).first();
    await validation1.isVisible();
    console.log("validation message for required field is displayed");
    await page.waitForTimeout(2000);
    
  });
  test("create event with invalid value format", async () => {
    // 2-create event with invalid value format
    await page.locator('input[id="title"]') .fill( "The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");
    await page.locator('input[id="legal_name"]').fill("The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");
    await page.locator('input[id="hst_number"]').fill('123456789RT0001 123456789RT0001 123456789RT000');
    // Tax field validation with differnt invalid values 
    const invalidInputs = ['102', 'hello', '4.5','&^*&(&*', '4.5...'];

    for (const input of invalidInputs) {
     
      await page.fill('input[id="event_tax"]', ''); // Clear the tax field
      await page.fill('input[id="event_tax"]',input); //  the tax field with the invalid value
      await page.press('input[id="event_tax"]', 'Tab');
      //await page.click('xpath=//*[@id="form_add_event"]');
      await page.waitForTimeout(2000);
    }

   // Application fee validation with different invalid inputs
    const invalidInputs1 = ['102','4.5', '-1'];
    for (const input of invalidInputs1) {
      
      await page.fill('input[id="application_fee"]', '');
      // Clear the tax field
      await page.fill('input[id="application_fee"]', input); 
      //  the tax field with the invalid value
      await page.press('input[id="application_fee"]', 'Tab');
      await page.waitForTimeout(2000);
    }
    await expect(page.getByText(/Please enter a value less than or equal to 100./i).first()).toBeVisible();
    //Fixed Application fee validation with different invalid inputs
    
    const invalidInputs2 = ['102', '4.5','-1', '123456'];
    for (const input of invalidInputs2) {
      
      await page.fill('input[id="fixed_application_fee"]', '');
      // Clear the tax field
      await page.fill('input[id="fixed_application_fee"]', input);
      //  the tax field with the invalid value
      await page.press('input[id="fixed_application_fee"]', 'Tab');
      await page.waitForTimeout(2000);
    }
    const validationMessage = page.getByText('Please enter a value less than or equal to 10.');
    await validationMessage.isVisible();
    await page.waitForTimeout(1000);
    expect(validationMessage).toHaveText('Please enter a value less than or equal to 10.');
    
    await page.click(XpathsEvent.timezoneDropdown);
    await page.click(XpathsEvent.timezoneOption);
    console.log('Timezone selected successfully.');
    await page.keyboard.press("Escape");
     // Click on the input field to open the dropdown
    await page.locator('#start_date').click();
    await page.getByRole('cell', { name: '1', exact: true }).nth(1).click();
    await page.keyboard.press("Escape");
    await page.locator('#end_date').click();
    await page.getByRole('cell', { name: '16' }).click();
    await page.keyboard.press("Escape");

    //Display Order validation with different invalid inputs
    const invalidInputs3 = ['0', '4.5','123456'];
    for (const input of invalidInputs3) {
      
      await page.fill('input[id="display_order"]', ''); 
      // Clear the tax field
      await page.fill('input[id="display_order"]', input); 
      //  the tax field with the invalid value
      await page.press('input[id="display_order"]', 'Tab');
      await page.waitForTimeout(2000);
    }
    const validationMessage2 = page.getByText('Please enter no more than 5 characters.');
    await validationMessage2.isVisible();
    await page.waitForTimeout(1000);
    expect(validationMessage2).toHaveText('Please enter no more than 5 characters.');  
    

    await page.click('input[id="submitUser"]');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
 
       
  });

  test("Attach invalid file format", async () => {
    //3-Attach invalid file format
    await page.waitForTimeout(2000);
    await page.fill('input[id="title"]', 'Automation event');
    await page.fill('input[id="legal_name"]', 'The event');
    await page.fill('input[id="hst_number"]', 'hst123');
    await page.fill('input[id="event_tax"]', '8');
    await page.fill('input[id="application_fee"]','80');
    await page.fill('input[id="fixed_application_fee"]','5');
    await page.click(XpathsEvent.timezoneDropdown);
    await page.click(XpathsEvent.timezoneOption);
    await page.waitForTimeout(3000);
    console.log('Timezone selected successfully.');
    await page.waitForTimeout(3000); // Click on the input field to open the dropdown
    await page.locator('#start_date').click();
    await page.getByRole('cell', { name: '1', exact: true }).nth(1).click();
    await page.locator('#end_date').click();
    await page.getByRole('cell', { name: '16' }).click();
    await page.fill('input[id="display_order"]','2');
    await page.locator("#event_banner").setInputFiles("image.jfif");  
    await page.click('input[id="submitUser"]');
    await page.locator('xpath=//*[@id="form_add_event"]/div[1]/div[1]');
    await page.getByText('Sorry, Your file extention is invalid.').waitFor();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByText('Sorry, Your file extention is invalid.').isVisible();
    await page.waitForTimeout(1000);
    
  });
  test("Attach File More than mentioned Size", async () => {
    //4- Attach more than 5mb larger size image 
    await page.waitForTimeout(2000);
    await page.fill('input[id="title"]', 'Automation event');
    await page.fill('input[id="legal_name"]', 'The event');
    await page.fill('input[id="hst_number"]', 'hst123');
    await page.fill('input[id="event_tax"]', '8');
    await page.fill('input[id="application_fee"]','80');
    await page.fill('input[id="fixed_application_fee"]','5');
    await page.click(XpathsEvent.timezoneDropdown);
    await page.click(XpathsEvent.timezoneOption);
    await page.waitForTimeout(3000);
    console.log('Timezone selected successfully.');
    await page.waitForTimeout(3000); // Click on the input field to open the dropdown
    await page.locator('#start_date').click();
    await page.getByRole('cell', { name: '1', exact: true }).nth(1).click();
    await page.locator('#end_date').click();
    await page.getByRole('cell', { name: '16' }).click();
    await page.fill('input[id="display_order"]','2')
    await page.locator("#event_banner").setInputFiles("pexels_10MB.jpg"); 
    await page.click('input[id="submitUser"]');
    await page.locator('xpath=//*[@id="form_add_event"]/div[1]/div[1]');
    await page.getByText('The file is too large. Allowed maximum size is 5MB').waitFor();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByText('The file is too large. Allowed maximum size is 5MB').isVisible();
    await page.waitForTimeout(2000);
    

  });

    test("Create event", async () => {
        //5-Create event after entering all valid values

        const headingText = await page.locator('h3.page-title').textContent(); 
        expect(headingText.trim()).toBe('Manage Events');
        console.log('Heading title is correct: "Manage Events".');
        await page.fill('input[id="title"]', 'Automation event');
        await page.fill('input[id="legal_name"]', 'The event');
        await page.fill('input[id="hst_number"]', 'hst123');
        await page.fill('input[id="event_tax"]', '8');
        await page.fill('input[id="application_fee"]','80');
        await page.fill('input[id="fixed_application_fee"]','5');
        await page.waitForTimeout(3000); 
        await page.click(XpathsEvent.dropdownSelect);
        await page.fill('input[Type="search"]','test',);
        await page.getByRole('option', { name: 'test' }).first().click();
        await page.getByLabel('test').locator('span').nth(2).click();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000); 
        await page.click(XpathsEvent.timezoneDropdown);
        await page.click(XpathsEvent.timezoneOption);
        await page.waitForTimeout(3000);
        console.log('Timezone selected successfully.');
        await page.waitForTimeout(3000); // Click on the input field to open the dropdown
        await page.locator('#start_date').click();
        await page.getByRole('cell', { name: '1', exact: true }).nth(1).click();
        await page.locator('#end_date').click();
        await page.getByRole('cell', { name: '16' }).click();
        await page.check('input[name="is_coming_soon"]','5');
        const isChecked = await page.isChecked('input[id="is_coming_soon"]');
        expect(isChecked).toBe(true); 
        console.log('"Coming Soon" checkbox is checked successfully.');
        await page.fill('input[id="max_allowed_qty"]','4');
        await page.fill('input[id="display_order"]','2'); 
        await page.locator("#event_banner").setInputFiles("event_banner.jpg");
        await page.fill('input[id="event_popuptitle"]','Event');
        await page.fill('textarea[id="event_details"]','Event Detail');
        await page.click('input[id="submitUser"]');
        await page.waitForTimeout(3000);
        await expect(
          page.locator(XpathsEvent.eventAddingSuccess)
        ).toBeVisible();
        });
        
});