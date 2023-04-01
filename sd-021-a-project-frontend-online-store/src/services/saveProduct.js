const CART_SAVED_ITEM_KEY = 'cart_saved_item';

if (!JSON.parse(localStorage.getItem(CART_SAVED_ITEM_KEY))) {
  localStorage.setItem(CART_SAVED_ITEM_KEY, JSON.stringify([]));
}
const readSavedItens = () => JSON.parse(localStorage.getItem(CART_SAVED_ITEM_KEY));

const saveSavedItens = (SavedItens) => localStorage
  .setItem(CART_SAVED_ITEM_KEY, JSON.stringify(SavedItens));

// --------------------------------------------------------------------
// Esse codigo foi copiado do projeto trybetunes e é de autoria da trybe.
// --------------------------------------------------------------------

export const getSavedItens = () => {
  const SavedItens = readSavedItens();
  return SavedItens;
};

export const addItem = (Item) => {
  if (Item) {
    const SavedItens = readSavedItens();
    saveSavedItens([...SavedItens, Item]);
  }
};

export const removeItem = (Item) => {
  const SavedItens = readSavedItens();
  let cont = 0;
  saveSavedItens(SavedItens.filter((s) => {
    if (s.id === Item.id && cont === 0) {
      cont += 1;
      return false;
    }
    return true;
  }));
};
