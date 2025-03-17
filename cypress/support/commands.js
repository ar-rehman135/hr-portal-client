/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/unsafe-to-chain-command */
// cypress/support/commands.ts


Cypress.Commands.add('login', (email, password) => {
    // Implementation for login if needed
  })
  
  // -- This is a child command --
  Cypress.Commands.add("drag", { prevSubject: "element" }, (subject, options) => {
    // Implementation for drag if needed
  })
  
  // -- This is a dual command --
  Cypress.Commands.add("dismiss", { prevSubject: "optional" }, (subject, options) => {
    // Implementation for dismiss if needed
  })
  
  // -- This will overwrite an existing command --
  // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
  
  // Declare global Cypress namespace to add custom commands
  
  export {}
  
  