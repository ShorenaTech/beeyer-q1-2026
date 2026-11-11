import { test, expect } from "../../fixtures/navigation.fixture";
import { goToLoginPage, goToStartPage } from "../../actions/navigation";
import LoginPage from "../../pages/login/LoginPage";

test.beforeAll(async () => {
  console.log("Starting login tests");
});

test.beforeEach(async ({ page }) => {
  await test.step("Navigate to Start Page", async () => {
    await goToStartPage(page);
  });

  const loginPage = await test.step("Navigate to the login Page", async () =>
    goToLoginPage(page));

  await test.step("Wait until login Page is loaded", async () => {
    await loginPage.waitUntilPageIsLoaded();
  });
});

test(
  "Verify login functionality",
  { tag: ["@smoke", "@regression", "@login"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Input username", async () => {
      await loginPage.inputUserName("students");
    });

    await test.step("input password", async () => {
      await loginPage.inputPassword("Default1!");
    });

    const myAccountPage = await test.step("Click the login button", async () =>
      loginPage.clickLoginButton());

    await test.step("wait until my account page is loaded", async () => {
      await myAccountPage.waitUntilPageIsLoaded();
    });

    const logOutText = await test.step("Get the Logout Text", async () =>
      myAccountPage.getLogOutText());

    await test.step("Verify login was successful", async () => {
      expect(logOutText).toBe("Log out");
    });
  },
);

test.afterAll(async () => {
  console.log("Finished login tests");
});
