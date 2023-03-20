import {
  adminControllerTest,
  assignmentControllerTest,
  moduleControllerTest,
  notificationControllerTest,
  userControllerTest,
} from "./tests";

// Run tests in specific order
describe("Run all tests", () => {
    adminControllerTest(); // Admin tests must be run first
    userControllerTest(); // Then run user tests
    moduleControllerTest(); // Then run module tests
    assignmentControllerTest(); // Then run assignment tests
    notificationControllerTest(); // Finally run notification tests
});