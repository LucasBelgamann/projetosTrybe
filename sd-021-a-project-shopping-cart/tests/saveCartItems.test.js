const localStorageSimulator = require("../mocks/localStorageSimulator");
const saveCartItems = require("../helpers/saveCartItems");

localStorageSimulator("setItem");

describe("4 - Teste a função saveCartItems", () => {
  it('teste se ao executar a função com o argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('teste se ao executar a função com o argumento, o método localStorage.setItem é chamado com dois parâmetros (cartItems e o valor passado para saveCartItems)', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith("cartItems", '<ol><li>Item</li></ol>');
  });
});
