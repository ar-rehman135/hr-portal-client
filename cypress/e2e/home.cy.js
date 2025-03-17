describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1').contains('Translate Text Instantly');
  });

  it('should display the header correctly', () => {
    cy.get('header').should('be.visible');
    cy.get('header').contains('Translator');
    cy.get('button').contains('Upgrade to Premium').should('be.visible');
    cy.get('button').contains('Apps and Extensions').should('be.visible');
  });

  it('should display the sidebar with all tools', () => {
    cy.viewport(1200, 800);
    cy.get('div').contains('Paraphraser').should('be.visible');
    cy.get('div').contains('Grammar Checker').should('be.visible');
    cy.get('div').contains('AI Detector').should('be.visible');
    cy.get('div').contains('Plagiarism Checker').should('be.visible');
    cy.get('div').contains('Summarizer').should('be.visible');
  });

  it('should display the main content with features', () => {
    cy.get('h1')
      .contains(
        'Translate Text Instantly with our AI-Powered Language Translator'
      )
      .should('be.visible');

    cy.contains('Instant').should('be.visible');
    cy.contains('Versatile').should('be.visible');
    cy.contains('Multilingual').should('be.visible');
    cy.contains('Affordable').should('be.visible');

    cy.get('button').contains('Get started for free').should('be.visible');
  });
});
