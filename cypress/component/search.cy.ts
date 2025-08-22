import { Search } from '../../src/app/components/search/search';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';

describe('Search Component', () => {
  it('should mount and display search field', () => {
    cy.mount(Search, {
      componentProperties: {
        searchName: 'character',
        items$: of([]),
        searchControl: new FormControl(''),
      },
    });

    cy.get('.search-container').should('be.visible');
    cy.get('mat-form-field').should('be.visible');
    cy.get('input[matInput]').should('be.visible');
    cy.contains('Search by character').should('be.visible');
    cy.get('input').should('have.attr', 'placeholder', 'Start typing character...');
  });

  it('should show autocomplete options when typing', () => {
    const mockItems = [
      { id: 1, value: 'Rick Sanchez' },
      { id: 2, value: 'Morty Smith' },
    ];

    cy.mount(Search, {
      componentProperties: {
        searchName: 'character',
        items$: of(mockItems),
        searchControl: new FormControl(''),
      },
    });

    cy.get('input[matInput]').click();
    cy.get('mat-option').should('have.length', 2);
    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Morty Smith').should('be.visible');
  });

  it('should handle user input in search field', () => {
    cy.mount(Search, {
      componentProperties: {
        searchName: 'location',
        items$: of([]),
        searchControl: new FormControl(''),
      },
    });

    cy.get('input[matInput]').type('Earth');
    cy.get('input[matInput]').should('have.value', 'Earth');
  });

  it('should display correct labels for different search types', () => {
    cy.mount(Search, {
      componentProperties: {
        searchName: 'episode',
        items$: of([]),
        searchControl: new FormControl(''),
      },
    });

    cy.contains('Search by episode').should('be.visible');
    cy.get('input').should('have.attr', 'placeholder', 'Start typing episode...');
  });
});
