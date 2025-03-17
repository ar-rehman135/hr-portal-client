describe('AI Detector Page', () => {
  beforeEach(() => {
    cy.visit('/ai-detector');
  });

  it('should display the AI Detector interface', () => {
    cy.get('select, [role="combobox"]').should('have.length.at.least', 2);
    cy.get('button').contains('Paste text').should('be.visible');
  });

  it('should have working dropdowns', () => {
    cy.get('select, [role="combobox"]').first().click();
    cy.get('[role="option"]').contains('Detect').click();

    cy.get('select, [role="combobox"]').eq(1).click();
    cy.get('[role="option"]').contains('English').click();

    cy.get('select, [role="combobox"]').eq(1).click();
    cy.get('[role="option"]').contains('Spanish').click();
  });

  it('should be responsive', () => {
    cy.viewport(1200, 800);
    cy.get('select, [role="combobox"]').should('be.visible');

    cy.viewport('iphone-x');
    cy.get('select, [role="combobox"]').should('be.visible');
  });
});
