const { test, expect } = require("@playwright/test");
import * as dotenv from "dotenv";
 
// Load environment variables from .env file
dotenv.config();
 
const BASE_URL = process.env.BASE_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
 
let page;
// Before each test, login with the username, password, and click login button
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(BASE_URL);
});
 
test.describe("Login Test Cases", () => {
    // 1. Unsuccessful Login with Incorrect Email
    test("Unsuccessful login with incorrect email", async () => {
        await page.fill("input[id='username']", "wrongemail@example.com");
        await page.fill("input[id='password']", PASSWORD);
        await page.click("input[type='submit']");
        await expect(page.locator("xpath=/html/body/div[3]/div")).toHaveText(
            "Error! Invalid Email or Password"
        );
        
    });
 
    // 2. Unsuccessful Login with Incorrect Password
    test("Unsuccessful login with incorrect password", async () => {
        await page.fill("input[id='username']", EMAIL);
        await page.fill("input[id='password']", "wrongpassword");
        await page.click("input[type='submit']");
        await expect(page.locator("xpath=/html/body/div[3]/div")).toHaveText(
            "Error! Invalid Email or Password"
        );
       
    });
 
    // 3. Email Field Left Blank
    test("Login attempt with email field left blank", async () => {
        await page.fill("input[id='password']", PASSWORD);
        await page.click("input[type='submit']");
        expect(page.getByText(/This field is required./i)).toBeTruthy();
        
    });
 
    // 4. Password Field Left Blank
    test("Login attempt with password field left blank", async () => {
        await page.fill("input[id='username']", EMAIL);
        expect(page.getByText(/This field is required./i)).toBeTruthy();
        
    });
 
    // 5. Both Email and Password Fields Left Blank
    test("Login attempt with both email and password fields left blank", async () => {
        await page.click("input[type='submit']");
        expect(page.getByText(/This field is required./i)).toBeTruthy();
      
    });
 
    // 6. Invalid Email Format
    test("Login attempt with invalid email format", async () => {
        await page.fill("input[id='username']", "invalidemail.com"); // Missing "@" and domain part
        await page.fill("input[id='password']", PASSWORD);
        await page.click("input[type='submit']");
        expect(page.getByText(/Please enter valid email address/i)).toBeTruthy();
      
    });
 
    // 7 - Login Sucessfull with Valid Credentials
    test("Login Sucessfull with Valid Credentials", async () => {
        await page.fill("input[id='username']", EMAIL);
        await page.fill("input[id='password']", PASSWORD);
        await page.click("input[type='submit']");
       
    });
});
 