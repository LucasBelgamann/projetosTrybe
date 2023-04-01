import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe(' Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const tituloH2 = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(tituloH2).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pok', () => {
    renderWithRouter(<App />);
    const btnProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemonFirst = pokemons.slice(1);

    pokemonFirst.forEach((item) => {
      userEvent.click(btnProximo);
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
  test('Teste se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemonsTela = document.querySelectorAll('.pokemon');
    expect(pokemonsTela.length === 1).toBeTruthy();
  });
  test('Deve existir um botão de filtragem para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const pokemonsTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const btnType = screen.getAllByTestId('pokemon-type-button');
    btnType.forEach((item, indice) => expect(item.innerHTML).toBe(pokemonsTypes[indice]));
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(btnAll);
    expect(btnAll).toBeInTheDocument();
  });
});
