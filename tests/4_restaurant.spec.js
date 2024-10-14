import { test, expect } from "@playwright/test";
import { XpathsRestaurants } from "../utils/constant.js";
import {
  generateCanadaMobileNumber,
  getRandomNumber,
} from "../utils/helpers.js";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker";

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
  await page.locator(XpathsRestaurants.selectManageRestaurantNav).waitFor(); // Navigate to Manage Coupons
  await page.click(XpathsRestaurants.selectManageRestaurantNav); // Navigate to Manage Coupons
  await page.click(XpathsRestaurants.addRestaurant);
})

test.describe("Restaurant Page", async () => {
  // 1 - Click on Submit Button without Fill any Fields
  test("Leave all required fields empty", async () => {
    // Submit Button
    await page.click(XpathsRestaurants.submitButton);
    await page.waitForTimeout(2000);
    const validation1 = page.getByText(/This field is required./i).first();
    const validation2 = page.locator("xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/p[1]");

    // Check if either Validation is visible
    const isValidation1Visible = await validation1.isVisible();
    const isValidation2Visible = await validation2.isVisible();

    // Assert that at least one of the elements is visible
    expect(isValidation1Visible || isValidation2Visible).toBeTruthy();

  });

  // 2 - Create Restaurant with Longer Texts in Field
  test("Create Restaurant with invalid value", async () => {
    
    await page.locator("#restaurant_name").fill( "The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");
    await page.locator("#billing_name").fill( "The Majestic Flavorful Fusion: Where Global Culinary Traditions Meet with a Modern Twist to Bring You Exquisite Dishes, Artfully Crafted from the Finest Ingredients, Bringing Together Food Lovers from All Walks of Life for a Dining Experience Like No Other!");
    //   Plan
    await page.click(XpathsRestaurants.planRestaurantDropdown);
    await page.click(XpathsRestaurants.planTypeExpertRestaurant);
    await page.keyboard.press("Escape");

    //   Top Categories
    await page.click(XpathsRestaurants.topCategoriesRestaurantDropdown);
    await page.click(XpathsRestaurants.selectTopCategory1);
    await page.click(XpathsRestaurants.selectTopCategory2);
    await page.keyboard.press("Escape");

    //   Order Mode
    await page.click(XpathsRestaurants.orderModeDining);
    await page.click(XpathsRestaurants.orderModeTakeAway);

    // Application fee validation with different invalid inputs
    const invalidInputs = ['102','4.5', '-1'];
    for (const input of invalidInputs) {
      
      await page.fill('input[id="application_fee"]', '');
      // Clear the tax field
      await page.fill('input[id="application_fee"]', input); 
      //  the tax field with the invalid value
      await page.press('input[id="application_fee"]', 'Tab');
      await page.waitForTimeout(2000);
    }
    
    //Fixed Application fee validation with different invalid inputs
    const invalidInputs1 = ['102', '4.5','-1', '123456'];
    for (const input of invalidInputs1) {
      
      await page.fill('input[id="fixed_application_fee"]', '');
      // Clear the tax field
      await page.fill('input[id="fixed_application_fee"]', input);
      //  the tax field with the invalid value
      await page.press('input[id="fixed_application_fee"]', 'Tab');
      await page.waitForTimeout(2000);
    }
    await page.locator('input[id="hst_number"]').fill('123456789RT0001 123456789RT0001 123456789RT000');

    //   ------------- Contact Details -----------
    //   Contact Person Name
    await page.locator("#contact_person_name").fill("Jonathan Alexander Frederickson III, Esquire, a Descendant of the Royal House of Frederickson, Known for His Charitable Contributions to the Arts, Philanthropic Endeavors Spanning Across Multiple Continents, and His Unwavering Commitment to Environmental Conservation, Animal Welfare, and Educational Reform, Inspiring Generations to Come.");
    
    //   Contact Person Designation
    await page.locator("#contact_person_designation").fill( "Chief Executive Officer and Global Strategic Advisor for Sustainable Innovation and Corporate Development, Overseeing International Operations, Cross-Functional Leadership, and Strategic Partnerships, Driving Organizational Growth, Operational Excellence, and Global Expansion While Championing Diversity, Equity, Inclusion, and Social Responsibility Initiatives.");
    
    //   Contact Number
    await page.locator('input[id="contact_number"]');
    const invalidInputs2 = ['827643876','simple text', '&^%^%$^%&^&', '789 67899 56784'];
    for (const input of invalidInputs2) {
    
    await page.fill('input[id="contact_number"]', '');
    // Clear the tax field
    await page.fill('input[id="contact_number"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="contact_number"]', 'Tab');
    await page.waitForTimeout(2000);
  }

    //   Email Address
    const invalidInputs3 = ['1029878', 'Simple Text','&^*&(&*', 'ktest@@yopmail.com', 'Ktest1@yopmail.commm'];

    for (const input of invalidInputs3) {
     
      await page.fill('input[id="email"]', ''); // Clear the tax field
      await page.fill('input[id="email"]',input); //  the tax field with the invalid value
      await page.press('input[id="email"]', 'Tab');
      await page.waitForTimeout(2000);
    }

    //   ------------- Address -----------
    //   Search Address
    await page.waitForTimeout(1000);
    await page.locator("#address").type("Toronto", { delay: 100 });
    await page.waitForTimeout(1000);
    await page.getByText("TorontoON, Canada").click();
    
    //Latitude
    await page.locator('input[id="latitude"]');
    const invalidInputs4 = ['843.653226','simple text', '&^%^%$^%&^&', '789 67899 56784', '8......78899'];
    for (const input of invalidInputs4) {
    
    await page.fill('input[id="latitude"]', '');
    // Clear the tax field
    await page.fill('input[id="latitude"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="latitude"]', 'Tab');
    await page.waitForTimeout(2000);
  }
    //Longitude
    await page.locator('input[id="longitude"]');
    const invalidInputs5 = ['-79.3831843','simple text', '&^%^%$^%&^&', '789 67899 56784', '8......78899'];
    for (const input of invalidInputs5) {
    
    await page.fill('input[id="longitude"]', '');
    // Clear the tax field
    await page.fill('input[id="longitude"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="longitude"]', 'Tab');
    await page.waitForTimeout(2000);
  }
    //   Zipcode
    await page.waitForTimeout(2000);
    await page.locator("#zip_code").type(`${faker.location.zipCode("######")}`, { delay: 100 });
    await page.locator("#zip_code").press("Enter");

    //   country
    await page.click(XpathsRestaurants.countryDropdown);
    await page.waitForTimeout(1000)
    await page.click(XpathsRestaurants.canadaCountry);

    //   Billing Address Same As Address?
    const billingAddress = await page.locator("#billing_same_as_location");
    const billingAddressCheck = getRandomNumber(0, 1);
    billingAddressCheck ? await billingAddress.check() : null;
    if (!billingAddressCheck) {
      // Billing Address
      await page.waitForTimeout(1000)
      await page.locator("#billing_address").type("Toronto", { delay: 100 });
      await page.waitForTimeout(1000)
      await page.getByText("TorontoON, Canada").click();

      await page.waitForTimeout(2000);
      await page
        .locator("#billing_zip_code")
        .type(`${faker.location.zipCode("######")}`, { delay: 100 });
      await page.locator("#billing_zip_code").press("Enter");

      await page.click(XpathsRestaurants.billingCountryDropdown);
      await page.waitForTimeout(1000)
      await page.click(XpathsRestaurants.billingCountry);
    }

    //   ------------- ORder Details -----------
    //   Restaurant Logo
    await page.locator("#restaurant_logo").setInputFiles("Restaurant_Logo.jpg");

    //   Restaurant Banner
    await page.locator("#restaurant_banner").setInputFiles("Restaurant_Banner.png");

    //Google review URL
    await page.locator('input[id="review_url"]');
    const invalidInputs6 = ['79.3831843','simple text', '&^%^%$^%&^&', '8......78899','www.google.com','https://google.com..'];
    for (const input of invalidInputs6) {
    
    await page.fill('input[id="review_url"]', '');
    // Clear the tax field
    await page.fill('input[id="review_url"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="review_url"]', 'Tab');
    await page.waitForTimeout(2000);
  }
  //APC
  await page.locator('input[id="apc"]');
    const invalidInputs7 = ['79.383','simple text', '&^%^%$^%&^&','-1'];
    for (const input of invalidInputs7) {
    
    await page.fill('input[id="apc"]', '');
    // Clear the tax field
    await page.fill('input[id="apc"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="apc"]', 'Tab');
    await page.waitForTimeout(2000);
  }
    //How many location
    await page.locator('input[id="locations_manage"]');
    const invalidInputs8 = ['79.383','simple text', '&^%^%$^%&^&','-1'];
    for (const input of invalidInputs8) {
    
    await page.fill('input[id="locations_manage"]', '');
    // Clear the tax field
    await page.fill('input[id="locations_manage"]', input); 
    //  the tax field with the invalid value
    await page.press('input[id="locations_manage"]', 'Tab');
    await page.waitForTimeout(2000);
  }
    // Submit Button
    await page.waitForTimeout(1000);
    await page.click(XpathsRestaurants.submitButton);

  });

  // 3 - Attach Invalid File Format
  test("Attach Invalid File Format", async () => {
    // Restaurant Name
    await page.locator("#restaurant_name").type("Chef Food", { delay: 100 });

    //   Plan
    await page.click(XpathsRestaurants.planRestaurantDropdown);
    await page.click(XpathsRestaurants.planTypeExpertRestaurant);
    await page.keyboard.press("Escape");

    //   Top Categories
    await page.click(XpathsRestaurants.topCategoriesRestaurantDropdown);
    await page.click(XpathsRestaurants.selectTopCategory1);
    await page.click(XpathsRestaurants.selectTopCategory2);
    await page.keyboard.press("Escape");

    //   Order Mode
    await page.click(XpathsRestaurants.orderModeDining);
    await page.click(XpathsRestaurants.orderModeTakeAway);

    //   ------------- Contact Details -----------
    //   Contact Person Name
    await page
      .locator("#contact_person_name")
      .type(`${faker.person.fullName()}`, { delay: 100 });

    //   Contact Person Designation
    await page.locator("#contact_person_designation").type("Admin", { delay: 100 });

    //   Contact Number
    await page
      .locator("#contact_number")
      .type(`${generateCanadaMobileNumber()}`, { delay: 100 });
    await page.getByLabel("Telephone country code").click();
    await page.waitForTimeout(1000)
    await page.locator("#iti-0__item-ca").click();
    await page
      .locator("#contact_number").click()

    //   Email Address
    await page
      .locator("#email")
      .type(`${faker.internet.email({ provider: "yopmail.com" })}`, { delay: 100 });

    //   ------------- Address -----------
    //   Search Address
    await page.locator("#address").type("Toronto", { delay: 100 });
    await page.waitForTimeout(1000);
    await page.getByText("TorontoON, Canada").click();

    //   Zipcode
    await page.waitForTimeout(2000);
    await page.locator("#zip_code").type(`${faker.location.zipCode("######")}`, { delay: 100 });
    await page.locator("#zip_code").press("Enter");

    //   country
    await page.click(XpathsRestaurants.countryDropdown);
    await page.waitForTimeout(1000)
    await page.click(XpathsRestaurants.canadaCountry);

    //   Billing Address Same As Address?
    const billingAddress = await page.locator("#billing_same_as_location");
    const billingAddressCheck = getRandomNumber(0, 1);
    billingAddressCheck ? await billingAddress.check() : null;
    if (!billingAddressCheck) {
      // Billing Address
      await page.locator("#billing_address").type("Toronto", { delay: 100 });
      await page.waitForTimeout(1000)
      await page.getByText("TorontoON, Canada").click();

      await page.waitForTimeout(2000);
      await page
        .locator("#billing_zip_code")
        .type(`${faker.location.zipCode("######")}`, { delay: 100 });
      await page.locator("#billing_zip_code").press("Enter");

      await page.click(XpathsRestaurants.billingCountryDropdown);
      await page.waitForTimeout(1000)
      await page.click(XpathsRestaurants.billingCountry);
    }

    //   ------------- ORder Details -----------
    //   Restaurant Logo
    await page.locator("#restaurant_logo").setInputFiles("Dummy PDF.pdf");

    //   Restaurant Banner
    await page.locator("#restaurant_banner").setInputFiles("Dummy PDF.pdf");

    // Submit Button
    await page.waitForTimeout(1000);
    await page.click(XpathsRestaurants.submitButton);
    await page.waitForTimeout(2000);
    await expect(
      page.getByText(/Please enter a value with a valid extension./i).first()
    ).toBeVisible();


  });

  // 4 - Attach Invalid File Format
  test("Attach File More than mentioned Size", async () => {
    // Restaurant Name
    await page.locator("#restaurant_name").type("Chef Food", { delay: 100 });

    //   Plan
    await page.click(XpathsRestaurants.planRestaurantDropdown);
    await page.click(XpathsRestaurants.planTypeExpertRestaurant);
    await page.keyboard.press("Escape");

    //   Top Categories
    await page.click(XpathsRestaurants.topCategoriesRestaurantDropdown);
    await page.click(XpathsRestaurants.selectTopCategory1);
    await page.click(XpathsRestaurants.selectTopCategory2);
    await page.keyboard.press("Escape");

    //   Order Mode
    await page.click(XpathsRestaurants.orderModeDining);
    await page.click(XpathsRestaurants.orderModeTakeAway);

    //   ------------- Contact Details -----------
    //   Contact Person Name
    await page
      .locator("#contact_person_name")
      .type(`${faker.person.fullName()}`, { delay: 100 });

    //   Contact Person Designation
    await page.locator("#contact_person_designation").type("Admin", { delay: 100 });

    //   Contact Number
    await page
      .locator("#contact_number")
      .type(`${generateCanadaMobileNumber()}`, { delay: 100 });
    await page.getByLabel("Telephone country code").click();
    await page.waitForTimeout(1000)
    await page.locator("#iti-0__item-ca").click();
    await page
      .locator("#contact_number").click()

    //   Email Address
    await page
      .locator("#email")
      .type(`${faker.internet.email({ provider: "yopmail.com" })}`, { delay: 100 });

    //   ------------- Address -----------
    //   Search Address
    await page.locator("#address").type("Toronto", { delay: 100 });
    await page.waitForTimeout(1000);
    await page.getByText("TorontoON, Canada").click();

    //   Zipcode
    await page.waitForTimeout(2000);
    await page.locator("#zip_code").type(`${faker.location.zipCode("######")}`, { delay: 100 });
    await page.locator("#zip_code").press("Enter");

    //   country
    await page.click(XpathsRestaurants.countryDropdown);
    await page.waitForTimeout(1000)
    await page.click(XpathsRestaurants.canadaCountry);

    //   Billing Address Same As Address?
    const billingAddress = await page.locator("#billing_same_as_location");
    const billingAddressCheck = getRandomNumber(0, 1);
    billingAddressCheck ? await billingAddress.check() : null;
    if (!billingAddressCheck) {
      // Billing Address
      await page.locator("#billing_address").type("Toronto", { delay: 100 });
      await page.waitForTimeout(1000)
      await page.getByText("TorontoON, Canada").click();

      await page.waitForTimeout(2000);
      await page
        .locator("#billing_zip_code")
        .type(`${faker.location.zipCode("######")}`, { delay: 100 });
      await page.locator("#billing_zip_code").press("Enter");

      await page.click(XpathsRestaurants.billingCountryDropdown);
      await page.waitForTimeout(1000)
      await page.click(XpathsRestaurants.billingCountry);
    }

    //   ------------- ORder Details -----------
    //   Restaurant Logo
    await page.locator("#restaurant_logo").setInputFiles("10MB_Image.jpg");

    //   Restaurant Banner
    await page.locator("#restaurant_banner").setInputFiles("10MB_Image.jpg");

    // Submit Button
    await page.waitForTimeout(1000);
    await page.click(XpathsRestaurants.submitButton);

    // Scroll to the top using the page.evaluate() method
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.waitForTimeout(2000);
    try {
      await page
        .locator("text=The file is too large. Allowed maximum size is 5MB")
        .waitFor({
          timeout: 5000, // 5 seconds
          state: "visible", // Wait for the element to be visible
        });
      // If the message appears within 5 seconds, perform the assertion
      await expect(
        page
          .getByText(/The file is too large. Allowed maximum size is 5MB/i)
          .first()
      ).toBeVisible();
    } catch (e) {
      // If the message does not appear within 5 seconds, the catch block will run
      throw new Error(
        'The expected error message "The file is too large. Allowed maximum size is 5MB" did not appear within 5 seconds'
      );
    }

    await page.waitForTimeout(2000);

  });


  // 7 - Restaurant Sucessfull Add
  test("Restaurant Added Sucessfully", async () => {
    // Restaurant Name
    await page.locator("#restaurant_name").type("Chef Food", { delay: 100 });

    //   Plan
    await page.click(XpathsRestaurants.planRestaurantDropdown);
    await page.click(XpathsRestaurants.planTypeExpertRestaurant);
    await page.keyboard.press("Escape");

    //   Top Categories
    await page.click(XpathsRestaurants.topCategoriesRestaurantDropdown);
    await page.click(XpathsRestaurants.selectTopCategory1);
    await page.click(XpathsRestaurants.selectTopCategory2);
    await page.keyboard.press("Escape");

    //   Order Mode
    await page.click(XpathsRestaurants.orderModeDining);
    await page.click(XpathsRestaurants.orderModeTakeAway);

    //   ------------- Contact Details -----------
    //   Contact Person Name
    await page
      .locator("#contact_person_name")
      .type(`${faker.person.fullName()}`, { delay: 100 });

    //   Contact Person Designation
    await page.locator("#contact_person_designation").type("Admin", { delay: 100 });

    //   Contact Number
    await page
      .locator("#contact_number")
      .type(`${generateCanadaMobileNumber()}`, { delay: 100 });
    await page.getByLabel("Telephone country code").click();
    await page.waitForTimeout(1000)
    await page.locator("#iti-0__item-ca").click();
    await page
      .locator("#contact_number").click()

    //   Email Address
    await page
      .locator("#email")
      .type(`${faker.internet.email({ provider: "yopmail.com" })}`, { delay: 100 });

    //   ------------- Address -----------
    //   Search Address
    await page.waitForTimeout(1000)
    await page.locator("#address").type("Toronto", { delay: 100 });
    await page.waitForTimeout(1000);
    await page.getByText("TorontoON, Canada").click();

    //   Zipcode
    await page.waitForTimeout(2000);
    await page.locator("#zip_code").type(`${faker.location.zipCode("######")}`, { delay: 100 });
    await page.locator("#zip_code").press("Enter");

    //   country
    await page.click(XpathsRestaurants.countryDropdown);
    await page.waitForTimeout(1000)
    await page.click(XpathsRestaurants.canadaCountry);

    //   Billing Address Same As Address?
    const billingAddress = await page.locator("#billing_same_as_location");
    const billingAddressCheck = getRandomNumber(0, 1);
    billingAddressCheck ? await billingAddress.check() : null;
    if (!billingAddressCheck) {
      // Billing Address
      await page.waitForTimeout(1000)
      await page.locator("#billing_address").type("Toronto", { delay: 100 });
      await page.waitForTimeout(1000)
      await page.getByText("TorontoON, Canada").click();

      await page.waitForTimeout(2000);
      await page
        .locator("#billing_zip_code")
        .type(`${faker.location.zipCode("######")}`, { delay: 100 });
      await page.locator("#billing_zip_code").press("Enter");

      await page.click(XpathsRestaurants.billingCountryDropdown);
      await page.waitForTimeout(1000)
      await page.click(XpathsRestaurants.billingCountry);
    }

    //   ------------- ORder Details -----------
    //   Restaurant Logo
    await page.locator("#restaurant_logo").setInputFiles("Restaurant_Logo.jpg");

    //   Restaurant Banner
    await page
      .locator("#restaurant_banner")
      .setInputFiles("Restaurant_Banner.png");

    // Submit Button
    await page.waitForTimeout(1000);
    await page.click(XpathsRestaurants.submitButton);
    await page.waitForTimeout(2000);

    // Validate that Restaurat Created
    await expect(
      page.locator(XpathsRestaurants.restaurantAddingSuccess)
    ).toBeVisible();

    
  });
});
