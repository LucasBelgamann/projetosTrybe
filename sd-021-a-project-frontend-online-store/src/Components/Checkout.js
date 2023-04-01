import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="fullName">
            {' '}
            Nome completo:
            <input type="text" data-testid="checkout-fullname" name="fullName" />
          </label>
          <label htmlFor="email">
            {' '}
            Email:
            <input type="email" data-testid="checkout-email" name="email" />
          </label>
          <label htmlFor="cpf">
            {' '}
            CPF:
            <input type="texto" data-testid="checkout-cpf" name="cpf" />
          </label>
          <label htmlFor="phone">
            {' '}
            Telefone:
            <input type="text" data-testid="checkout-phone" name="phone" />
          </label>
          <label htmlFor="cep">
            {' '}
            CEP:
            <input type="text" data-testid="checkout-cep" name="cep" />
          </label>
          <label htmlFor="endereco">
            Endereço:
            <input type="text" data-testid="checkout-address" name="endereco" />
          </label>
        </form>
      </div>
    );
  }
}

export default Checkout;
