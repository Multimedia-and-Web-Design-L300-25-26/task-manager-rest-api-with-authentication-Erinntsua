process.env.NODE_ENV = "test";

require("dotenv").config();

module.exports = {
  testEnvironment: "node",
  transform: {},
  setupFiles: ["dotenv/config"]
};
