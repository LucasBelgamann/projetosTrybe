import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando os links de navegação', () => {
  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const favoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página inicial,', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a aplicação é redirecionada para a página de Pok Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    const xablau = '/weberson.naoencontrei';
    history.push(xablau);

    const text = screen.getByText('Page requested not found');

    expect(text).toBeInTheDocument();
  });
});
