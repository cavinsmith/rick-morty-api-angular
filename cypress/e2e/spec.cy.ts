describe('Rick and Morty App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Home Page', () => {
    it('should display the home page correctly', () => {
      cy.contains('Rick and Morty API demo').should('be.visible');
      cy.contains('Welcome to the Rick and Morty API demo!').should('be.visible');
      cy.get('img[alt="Rick and Morty"]').should('be.visible');
      cy.contains('Use the search to find specific').should('be.visible');
    });

    it('should have navigation toolbar', () => {
      cy.get('.toolbar').should('be.visible');
      cy.get('.toolbar-logo').should('contain.text', 'R&M');
      cy.get('app-portal').should('be.visible');
    });

    it('should navigate to different sections', () => {
      cy.contains('Characters').click();
      cy.url().should('include', '/characters');
      cy.contains('Characters').should('be.visible');

      cy.go('back');
      cy.contains('Locations').click();
      cy.url().should('include', '/locations');

      cy.go('back');
      cy.contains('Episodes').click();
      cy.url().should('include', '/episodes');
    });
  });

  describe('Characters Page', () => {
    beforeEach(() => {
      cy.visit('/characters');
    });

    it('should display characters page', () => {
      cy.contains('Characters').should('be.visible');
      cy.get('app-generic-list').should('be.visible');
    });

    it('should load and display character links', () => {
      cy.get('app-link', { timeout: 10000 }).should('exist');
      cy.get('app-link').first().should('be.visible');
    });

    it('should navigate to character details', () => {
      cy.get('app-link', { timeout: 10000 }).first().click();
      cy.url().should('include', '/character/');
    });
  });

  describe('Locations Page', () => {
    beforeEach(() => {
      cy.visit('/locations');
    });

    it('should display locations page', () => {
      cy.contains('Locations').should('be.visible');
      cy.get('app-generic-list').should('be.visible');
    });

    it('should load and display location links', () => {
      cy.get('app-link', { timeout: 15000 }).should('exist');
      cy.get('app-link').should('be.visible');
    });
  });

  describe('Episodes Page', () => {
    beforeEach(() => {
      cy.visit('/episodes');
    });

    it('should display episodes page', () => {
      cy.contains('Episodes').should('be.visible');
      cy.get('app-generic-list').should('be.visible');
    });

    it('should load and display episode links', () => {
      cy.get('app-link', { timeout: 15000 }).should('exist');
      cy.get('app-link').should('be.visible');
    });
  });

  describe('Navigation', () => {
    it('should navigate back to home from logo', () => {
      cy.visit('/characters');
      cy.get('.toolbar-logo').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('Rick and Morty API demo').should('be.visible');
    });

    it('should highlight active navigation item', () => {
      cy.visit('/characters');
      cy.get('.toolbar-icon').contains('Characters').should('have.class', 'active-icon');

      cy.visit('/locations');
      cy.get('.toolbar-icon').contains('Locations').should('have.class', 'active-icon');

      cy.visit('/episodes');
      cy.get('.toolbar-icon').contains('Episodes').should('have.class', 'active-icon');
    });
  });
});
