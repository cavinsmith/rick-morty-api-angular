import { CharacterCard } from '../../src/app/components/character-card/character-card';
import { Character } from '../../src/app/store/models/character.model';

describe('CharacterCard Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  it('should mount and display character information', () => {
    cy.mount(CharacterCard, {
      componentProperties: {
        character: mockCharacter,
        locationRouterLink: 'location',
      },
    });

    cy.get('.character-card').should('be.visible');
    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Human').should('be.visible');
    cy.contains('Status: Alive').should('be.visible');
    cy.contains('Gender: Male').should('be.visible');
    cy.contains('Origin:').should('be.visible');
    cy.contains('Location:').should('be.visible');
  });

  it('should display character image', () => {
    cy.mount(CharacterCard, {
      componentProperties: {
        character: mockCharacter,
        locationRouterLink: 'location',
      },
    });

    cy.get('.character-image')
      .should('have.css', 'background-image')
      .and('include', mockCharacter.image);
    cy.get('.character-header-image')
      .should('have.css', 'background-image')
      .and('include', mockCharacter.image);
  });

  it('should handle character with no origin/location URLs', () => {
    const characterWithoutUrls: Character = {
      ...mockCharacter,
      origin: {
        name: 'Unknown',
        url: '',
      },
      location: {
        name: 'Unknown',
        url: '',
      },
    };

    cy.mount(CharacterCard, {
      componentProperties: {
        character: characterWithoutUrls,
        locationRouterLink: 'location',
      },
    });

    cy.contains('Unknown').should('be.visible');
    cy.get('app-link').should('not.exist');
  });

  it('should not render when character is null', () => {
    cy.mount(CharacterCard, {
      componentProperties: {
        character: null,
        locationRouterLink: 'location',
      },
    });

    cy.get('.character-card').should('not.exist');
  });
});
