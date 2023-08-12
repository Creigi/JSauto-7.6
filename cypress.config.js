const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      openMode: 0,
      runMode: 1
    },
    
    viewportHeight: 800,
    viewportWidth: 1366,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }  
});
