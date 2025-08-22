import { Toolbar } from '../../src/app/components/toolbar/toolbar';

describe('Toolbar Component', () => {
  const mockLinks = [
    { path: '/characters', label: 'Characters' },
    { path: '/locations', label: 'Locations' },
    { path: '/episodes', label: 'Episodes' },
  ];

  it('should mount and display toolbar elements', () => {
    cy.mount(Toolbar, {
      componentProperties: {
        links: mockLinks,
      },
    });

    cy.get('.toolbar').should('be.visible');
    cy.get('.toolbar-logo').should('contain.text', 'R&M');
    cy.get('app-portal').should('be.visible');
  });

  it('should display all navigation links', () => {
    cy.mount(Toolbar, {
      componentProperties: {
        links: mockLinks,
      },
    });

    cy.get('.toolbar-icon').should('have.length', 3);
    cy.contains('Characters').should('be.visible');
    cy.contains('Locations').should('be.visible');
    cy.contains('Episodes').should('be.visible');
  });

  it('should have home link in logo', () => {
    cy.mount(Toolbar, {
      componentProperties: {
        links: mockLinks,
      },
    });

    cy.get('.toolbar-logo').should('have.attr', 'routerLink', '/');
  });

  it('should have correct router links for navigation items', () => {
    cy.mount(Toolbar, {
      componentProperties: {
        links: mockLinks,
      },
    });

    cy.get('.toolbar-icon').eq(0).should('have.attr', 'routerLink', '/characters');
    cy.get('.toolbar-icon').eq(1).should('have.attr', 'routerLink', '/locations');
    cy.get('.toolbar-icon').eq(2).should('have.attr', 'routerLink', '/episodes');
  });

  it('should handle empty links array', () => {
    cy.mount(Toolbar, {
      componentProperties: {
        links: [],
      },
    });

    cy.get('.toolbar').should('be.visible');
    cy.get('.toolbar-logo').should('be.visible');
    cy.get('.toolbar-icon').should('not.exist');
  });
});
