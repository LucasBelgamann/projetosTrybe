import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('teste o componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not', () => {
    renderWithRouter(<NotFound />);
    const notFounding = screen.getByRole('heading', {
      name: /page requested not/i, level: 2,
    });
    expect(notFounding).toBeInTheDocument();
  });
  test('Teste se a imgem pikachuNotFoud renderiza na tela', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveProperty('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
