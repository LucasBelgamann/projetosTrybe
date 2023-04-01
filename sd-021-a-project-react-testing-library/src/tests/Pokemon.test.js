import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('testando pokemons', () => {
  test('Teste se é renderizado um card com as informações', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name').textContent;
    const typePokemon = screen.getByTestId('pokemon-type').textContent;
    const kgPokemon = screen.getByTestId('pokemon-weight').textContent;
    const imgPokemon = screen.getByAltText('Pikachu sprite');

    expect(namePokemon).toBe('Pikachu');
    expect(typePokemon).toBe('Electric');
    expect(kgPokemon).toBe('Average weight: 6.0 kg');
    expect(imgPokemon).toHaveProperty(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });
  test('Teste se o card do pokémon indicado na Pokédex contém um link de nav', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByRole('link', { name: /more details/i });
    expect(pikachu).toHaveProperty('href', 'http://localhost/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do pokémon, é feito o rediret', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const pokemonFavorite = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(pokemonFavorite).toBeInTheDocument();
    expect(pokemonFavorite).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
