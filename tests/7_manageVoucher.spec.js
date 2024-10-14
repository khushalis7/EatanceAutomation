const { test,expect } = require('@playwright/test');
import { XpathsVoucher } from "../utils/constant";
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
    await page.click("input[type='submit']");
});
test.beforeEach(async () => {
    await page.waitForTimeout(1000);
    await page.click(XpathsVoucher.eventManagement);
    await page.click(XpathsVoucher.manageVoucher);
    await page.click(XpathsVoucher.addVoucher);
});
test.describe("Manage voucher page", async () => {
    // 1 - Click on Submit Button without Fill any Fields
  test("Leave all required fields empty", async () => {
    // Submit Button
    await page.waitForTimeout(2000);
    await page.click(XpathsVoucher.submitButton);
    await page.evaluate(() => window.scrollTo(0, 0));
    const validation1 = page.getByText(/This field is required./i).first();
    await validation1.isVisible();
    console.log("validation message for required field is displayed");
    await page.waitForTimeout(2000);
    
  });
  test("create voucher with invalid value format", async () => {
  //2-Create voucher with invalid value format
    await page.click(XpathsVoucher.selectEvent);
    await page.click(XpathsVoucher.selectOption);
    await page.keyboard.press("Escape");
    console.log('Event selected successfully.');
    await page.locator('input[id="title"]') .fill( "The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");
    
    const invalidInputs = ['0', '7.99879873927','50.5','6786543987'];
    for (const input of invalidInputs) {
      await page.fill('input[id="price"]', ''); // Clear the tax field
      await page.fill('input[id="price"]', input); // Fill the tax field with the invalid value
      await page.press('input[id="price"]', 'Tab');
      await page.waitForTimeout(1000);
    }
    const invalidInputs1 = ['0', '8.79897987987','80.88','5786513987'];
    for (const input of invalidInputs1) {
      await page.fill('input[id="original_price"]', ''); // Clear the tax field
      await page.fill('input[id="original_price"]', input); // Fill the tax field with the invalid value
      await page.press('input[id="original_price"]', 'Tab');
      await page.waitForTimeout(1000);
    }
    await expect(page.getByText(/Please enter a value less than or equal to 99999999./i).first()).toBeVisible();

    await page.locator('input[id="voucher_color"]').click();
    await page.locator('#expiry_date').click();
    await page.getByRole('cell', { name: '30' }).nth(1).click();
    await page.keyboard.press("Escape");

    const invalidInput2 = ['0', '8.9','12345678'];
    for (const input of invalidInput2) {
      await page.fill('input[id="extend_hour"]', ''); // Clear the tax field
      await page.fill('input[id="extend_hour"]', input); 
      await page.press('input[id="extend_hour"]', 'Tab');
      //await page.click('xpath=//*[@id="form_add_voucher"]'); 
      await page.waitForTimeout(1000);
    }
    await expect(page.getByText('Please enter a value less than or equal to 10.')).toBeVisible();
    /*const validationMessage1 = page.getByText('Please enter a value less than or equal to 10.');
    await validationMessage1.isVisible();
    await page.waitForTimeout(1000);
    expect(validationMessage1).toHaveText('Please enter a value less than or equal to 10.'); */

    const invalidInput3 = ['0', '5','4.5', '2345675654656'];
    for (const input of invalidInput3) {
      await page.fill('input[id="max_allowed"]', ''); // Clear the tax field
      await page.fill('input[id="max_allowed"]', input); // Fill the tax field with the invalid value
      await page.press('input[id="max_allowed"]', 'Tab');
      await page.waitForTimeout(1000);
    }
    await expect(page.getByText('Please enter no more than 10 characters.')).toBeVisible();
    /*const validationMessage2 = page.getByText('Please enter no more than 10 characters.');
    await validationMessage2.isVisible();
    await page.waitForTimeout(1000);
    expect(validationMessage2).toHaveText('Please enter no more than 10 characters.');*/

    const invalidInputs4 = ['0','6.7', '123456'];
    for (const input of invalidInputs4) {
      await page.fill('input[id="display_order"]', ''); // Clear the tax field
      await page.fill('input[id="display_order"]', input); // Fill the tax field with the invalid value
      await page.press('input[id="display_order"]', 'Tab');
      await page.waitForTimeout(1000);
    }
    await expect(page.getByText('Please enter no more than 5 characters.')).toBeVisible();
     
    await page.reload();
    await page.click(XpathsVoucher.selectEvent);
    await page.click(XpathsVoucher.selectOption);
    await page.keyboard.press("Escape");
    console.log('Event selected successfully.');
    await page.locator('input[id="title"]') .fill('Voucher Title');
    await page.fill('input[id="price"]', '500');
    await page.fill('input[id="original_price"]', '400');
    await page.locator('input[id="voucher_color"]').click();
    await page.locator('#expiry_date').click();
    await page.getByRole('cell', { name: '5' }).nth(4).click();
    await page.keyboard.press("Escape");
    await page.fill('input[id="max_allowed"]', '10');
    await page.fill('input[id="display_order"]', '5'); 
    await page.click(XpathsVoucher.submitButton);
    await page.locator('xpath=//*[@id="form_add_voucher"]/div[1]/div[1]');
    await page.getByText('Offer price must be less than the original price.').waitFor();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByText('Offer price must be less than the original price.').isVisible();
    console.log('price validation message is displayed');
    await page.waitForTimeout(2000);

  });
  test("create voucher with valid value", async () => {
    await page.click(XpathsVoucher.selectEvent);
    await page.click(XpathsVoucher.selectOption);
    await page.keyboard.press("Escape");
    console.log('Event selected successfully.');
    await page.locator('input[id="title"]') .fill('Voucher Title');
    await page.fill('input[id="price"]', '500');
    await page.fill('input[id="original_price"]', '600');
    await page.locator('input[id="voucher_color"]').click();
    await page.locator('#expiry_date').click();
    await page.getByRole('cell', { name: '30' }).nth(1).click();
    await page.keyboard.press("Escape");
    await page.fill('input[id="max_allowed"]', '10');
    await page.fill('input[id="display_order"]', '5'); 
    await page.click(XpathsVoucher.submitButton);
    await page.waitForTimeout(3000);
    await expect(page.locator(XpathsVoucher.voucherSuccess)).toBeVisible();
  
  });
});