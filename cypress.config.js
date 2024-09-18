const { defineConfig } = require("cypress");

module.exports = defineConfig({  
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 120000,
  execTimeout: 120000, // Set exec timeout to 120 seconds
  taskTimeout: 120000, // Set task timeout to 120 seconds
  e2e: {
    watchForFileChanges: false,    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1536,
    viewportHeight: 695,
    projectId: "jozqcc",
    redirectionLimit: 50
  }
});
