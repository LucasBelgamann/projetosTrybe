import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testando o component About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const information = screen.getByText(/This application simulates/i);

    expect(information).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i, level: 2,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafo1 = screen.getByText(
      /this application simulates a pokédex/i,
    );
    const paragrafo2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveProperty('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
