import React from 'react';
import { render, screen, act, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import DataMock from './DataMock';

describe('Testando a página de planets', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DataMock)
    })
    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  }); 

  test('Verifica a renderização dos elementos', () => {
    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const numberFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });
    const removeFilterBtn = screen.getByRole('button', {
      name: /remove filters/i,
    });

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(numberFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(removeFilterBtn).toBeInTheDocument();
  });

  test('Teste se a Api esta sendo chamada', async () => {
    expect(fetch).toHaveBeenCalled();
    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });

  test('Verificando se o filtro name planet está funcionando', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(11);

    const name = screen.getByTestId('name-filter');
    userEvent.type(name, 'tatooine');
    expect( await screen.findAllByRole('row')).toHaveLength(2);

    userEvent.type(name, 'a');
    expect(await screen.findAllByRole('row')).toHaveLength(1);
  });

  test('Verifica se os filtros dos select  maior que esta funcionando', async () => {
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: "maior que"} });

    const numberFilter = screen.getByTestId('value-filter');
    userEvent.type(numberFilter, '10000');

    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });
    userEvent.click(btnFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(8);
  });

  test('Verifica se os filtros dos select  menor que esta funcionando', async () => {
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: "menor que"} });

    const numberFilter = screen.getByTestId('value-filter');
    userEvent.type(numberFilter, '2000000');

    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });
    userEvent.click(btnFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(3);
  });

  test('Verifica se os filtros dos select  igual a esta funcionando', async () => {
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: "igual a"} });

    const numberFilter = screen.getByTestId('value-filter');
    userEvent.type(numberFilter, '1000000000000');

    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });
    userEvent.click(btnFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(1);
  });

  test('Teste se remove um filter por vez', async () => {
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: "maior que"} });

    const filterNumber = screen.getByTestId(/value-filter/i);
    userEvent.type(filterNumber, '450000');

    const buttonFilter = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(7);

    const removeBtnItem = screen.getByRole('button', { name: /X/i })
    userEvent.click(removeBtnItem);

    expect(await screen.findAllByRole('row')).toHaveLength(7);
  })

  it('Teste se Remove Todos os Filtros', async () => {
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: "maior que"} });

    const filterNumber = screen.getByTestId(/value-filter/i);
    userEvent.type(filterNumber, '450000');

    const buttonFilter = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(7);

    const removeFilterBtn = screen.getByRole('button', {
      name: /remove filters/i,
    });
    userEvent.click(removeFilterBtn);

    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });
});

