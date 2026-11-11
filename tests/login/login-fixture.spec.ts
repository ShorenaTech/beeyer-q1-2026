import { test, expect } from "../../fixtures/navigation.fixture";
test(
  "Verify a user can login to the application with valid credentials",
  { tag: ["@smoke", "@regression", "@login", "@positive"] },
  async ({ myAccountPage }) => {
    const logOutText = await test.step("Get the Log out text", async () =>
      myAccountPage.getLogOutText());

    await test.step("Verify login was successful", async () => {
      expect(logOutText).toBe("Log out");
    });
  },
);
