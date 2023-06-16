const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    video: true,
    projectId: "randomID455",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
