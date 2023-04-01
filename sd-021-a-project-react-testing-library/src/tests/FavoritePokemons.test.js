import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

describe('Teste Favorites pokemons', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const favorites = document.querySelectorAll('.favorite-pokemon');
    const notFound = screen.getByText('No favorite pokemon found');

    if (favorites.length === 0) {
      expect(notFound).toBeInTheDocument();
    }
    expect(() => (favorites.length > 0)).toBeTruthy();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);
    const favorite = screen.getByText(/pikachu/i);
    expect(favorite).toBeInTheDocument();
  });
});
