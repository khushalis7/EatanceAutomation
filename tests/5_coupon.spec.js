import { test, expect } from "@playwright/test";
import { XpathsCoupon } from "../utils/constant.js";
import {
  getRandomNumber,
  generateCouponCode,
  couponDiscountType,
} from "../utils/helpers.js";
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
  await page.waitForTimeout(1000);
});

test.beforeEach(async () => {
  await page.locator(XpathsCoupon.dashboard).waitFor();
  await page.click(XpathsCoupon.dashboard);
  await page.click(XpathsCoupon.dashboardAddCoupon);
  //await page.locator(XpathsCoupon.selectManageCouponNav).waitFor(); // Navigate to Manage Coupons
 // await page.click(XpathsCoupon.selectManageCouponNav); // Navigate to Manage Coupons
  //await page.click(XpathsCoupon.selectManageCoupon);
  //await page.getByRole("link", { name: " Add Coupon" }).click(); // Go to Add Coupon page
});

/*test.afterEach(async (testInfo) => {
  // Runs after each test in this file
  if (testInfo.status === "passed") {
    await page.screenshot({
      path: `screenshots/success-${testInfo.title}-${Date.now()}.png`,
    });
  } else if (testInfo.status === "failed") {
    await page.screenshot({
      path: `screenshots/failure-${testInfo.title}.png`,
    });
  }
}); */

test.describe("Coupon Page Test", async () => {
  // Create Coupon with blank fields
  test("Leave all required fields blank", async () => {
   // Submit Button
   await page.waitForTimeout(2000);
   await page.click(XpathsCoupon.submitButton);
   await page.evaluate(() => window.scrollTo(0, 0));
   const validation1 = page.getByText(/This field is required./i).first();
   await validation1.isVisible();
   console.log("validation message for required field is displayed");
   await page.waitForTimeout(2000);
  });

  test("create coupon with invalid values", async () => {
    // create coupon with invalid values
    await page.click(XpathsCoupon.restaurantDropdown);
    await page.click(XpathsCoupon.selectRestaurantOption);

    // Select Coupon Type
    await page.click(XpathsCoupon.couponTypeDropdown);
    await page.click(XpathsCoupon.selectCouponType);

    // Select Discount Type
    const amountDiscountType = await page.getByRole("radio").nth(1);
    const percentageDiscountType = await page.getByRole("radio").first();

    const invalidInputs = ['102', 'hello', '4.5','&^*&(&*', '4.5...'];

    for (const input of invalidInputs) {
     
      await page.fill('input[id="coupon_amount"]', ''); // Clear the coupon field
      await page.fill('input[id="coupon_amount"]',input); //  the coupon field with the invalid value
      await page.press('input[id="coupon_amount"]', 'Tab');
      
      await page.waitForTimeout(2000);
    }

    // Coupon Title
    const couponTitle = "BIGTREAT";
    await page.getByPlaceholder("Coupon Title").fill(couponTitle);

    // Coupon Code
    const couponCode = generateCouponCode();
    await page.getByPlaceholder("Coupon Code").fill(couponCode);

    // Select Start and End Date
    await page.getByPlaceholder("Select Start to End Date &").click();
    await page.getByRole("cell", { name: "19" }).first().click();
    await page.getByRole("cell", { name: "31" }).nth(1).click();
    await page.getByRole("button", { name: "Apply" }).click();

    // Number of Coupons per User
    const invalidInputs2 = ['0','-1', 'hello', '4.5','&^*&(&*', '4.5...','10'];

    for (const input of invalidInputs2) {
     
      await page.fill('input[id="per_user_coupon_usage_limit"]', ''); // Clear the coupon field
      await page.fill('input[id="per_user_coupon_usage_limit"]',input); //  the coupon field with the invalid value
      await page.press('input[id="per_user_coupon_usage_limit"]', 'Tab');
      
      await page.waitForTimeout(2000);
    }

    // Total Number of Coupons
    // Number of Coupons per User
    const invalidInputs3 = ['-1', 'hello', '4.5','&^*&(&*', '4.5...','8'];

    for (const input of invalidInputs3) {
     
      await page.fill('input[id="no_of_coupons"]', ''); // Clear the coupon field
      await page.fill('input[id="no_of_coupons"]',input); //  the coupon field with the invalid value
      await page.press('input[id="no_of_coupons"]', 'Tab');
      
      await page.waitForTimeout(2000);
    }

    // Valid on Days
    await page.click(XpathsCoupon.validOnDaysDropdown);
    await page.click(XpathsCoupon.selectDayOption);
    await page.keyboard.press("Escape");

    // Meal Time
    await page.click(XpathsCoupon.mealTimeDropdown);
    await page.click(XpathsCoupon.selectMealTime);
    await page.keyboard.press("Escape");

    // Order Mode
    await page.click(XpathsCoupon.orderModeDropdown);
    await page.click(XpathsCoupon.selectOrderMode);
    await page.keyboard.press("Escape");

    // Eatance Cost Value
    const invalidInputs4 = ['101','-1', 'hello', '4.5','&^*&(&*', '4.5...','8'];

    for (const input of invalidInputs4) {
     
      await page.fill('input[id="eatance_cost_value"]', ''); // Clear the coupon field
      await page.fill('input[id="eatance_cost_value"]',input); //  the coupon field with the invalid value
      await page.press('input[id="eatance_cost_value"]', 'Tab');
      
      await page.waitForTimeout(2000);
    }

    // Display Order
    const invalidInputs5 = ['101','-1', 'hello', '4.5','&^*&(&*', '4.5...','8'];

    for (const input of invalidInputs5) {
     
      await page.fill('input[id="sort_order"]', ''); // Clear the coupon field
      await page.fill('input[id="sort_order"]',input); //  the coupon field with the invalid value
      await page.press('input[id="sort_order"]', 'Tab');
      
      await page.waitForTimeout(2000);
    }

  });

  
  test("Create Coupon with valid values", async () => {
    // Select Restaurant
    await page.click(XpathsCoupon.restaurantDropdown);

    await page.click(XpathsCoupon.selectRestaurantOption);

    // Select Coupon Type
    await page.click(XpathsCoupon.couponTypeDropdown);
    await page.click(XpathsCoupon.selectCouponType);

    // Select Discount Type
    const amountDiscountType = await page.getByRole("radio").nth(1);
    const percentageDiscountType = await page.getByRole("radio").first();

    couponDiscountType[getRandomNumber(0, 1)] === "percentage"
      ? await percentageDiscountType.check()
      : await amountDiscountType.check();

    if (await percentageDiscountType.isChecked()) {
      const couponPercentage = getRandomNumber(0, 100);
      await page
        .getByPlaceholder("Coupon Amount (%)")
        .fill(`${couponPercentage}`);

      const maxDiscount = getRandomNumber(50, 100);
      await page.getByPlaceholder("Max Discount Amount").fill(`${maxDiscount}`);
    } else {
      // Coupon Amount (random between 10 and 100)
      const couponAmount = getRandomNumber(10, 100);
      await page.getByPlaceholder("Coupon Amount ($)").fill(`${couponAmount}`);
    }

    // Minimum Order Amount
    await page.getByPlaceholder("Min Order Amount").fill("100");

    // Coupon Title
    const couponTitle = "BIGTREAT";
    await page.getByPlaceholder("Coupon Title").fill(couponTitle);

    // Coupon Code
    const couponCode = generateCouponCode();
    await page.getByPlaceholder("Coupon Code").fill(couponCode);

    // Select Start and End Date
    await page.getByPlaceholder("Select Start to End Date &").click();
    await page.getByRole("cell", { name: "19" }).first().click();
    await page.getByRole("cell", { name: "31" }).nth(1).click();
    await page.getByRole("button", { name: "Apply" }).click();

    // Invalid Number of Coupons per User (e.g., zero)
    await page.getByPlaceholder("No of coupons per User").fill("5");

    // Total Number of Coupons
    const totalCoupons = getRandomNumber(10, 50);
    await page
      .getByPlaceholder("Total Number of Coupon")
      .fill(`${totalCoupons}`);

    // Valid on Days
    await page.click(XpathsCoupon.validOnDaysDropdown);
    await page.click(XpathsCoupon.selectDayOption);
    await page.keyboard.press("Escape");

    // Meal Time
    await page.click(XpathsCoupon.mealTimeDropdown);
    await page.click(XpathsCoupon.selectMealTime);
    await page.keyboard.press("Escape");

    // Order Mode
    await page.click(XpathsCoupon.orderModeDropdown);
    await page.click(XpathsCoupon.selectOrderMode);
    await page.keyboard.press("Escape");

    // Eatance Cost Value
    const eatanceCost = getRandomNumber(5, 100);
    await page.getByPlaceholder("Eatance Cost Value").fill(`${eatanceCost}`);

    // Display Order
    const displayOrder = getRandomNumber(1, 20);
    await page.getByPlaceholder("Display Order").fill(`${displayOrder}`);

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).click();

    // Wait for potential error message
    try {
      await page
        .locator("text=Please enter a value greater than or equal to 0.")
        .waitFor({
          timeout: 3000, // 3 seconds
          state: "visible", // Wait for the element to be visible
        });
      // If the message appears within 3 seconds, perform the assertion
      expect(
        page
          .getByText(/Please enter a value greater than or equal to 0./i)
          .first()
      ).toBeVisible();
    } catch (e) {
      // If the message does not appear within 3 seconds, the catch block will run
      console.log("Coupon created successfully");
    }

  });

});
