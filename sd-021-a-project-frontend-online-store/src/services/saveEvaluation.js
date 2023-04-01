const SAVED_EVALUATION_KEY = 'saved_evaluation';

if (!JSON.parse(localStorage.getItem(SAVED_EVALUATION_KEY))) {
  localStorage.setItem(SAVED_EVALUATION_KEY, JSON.stringify([]));
}
const readSavedEval = () => JSON.parse(localStorage.getItem(SAVED_EVALUATION_KEY));

const saveSavedEval = (SavedEval) => localStorage
  .setItem(SAVED_EVALUATION_KEY, JSON.stringify(SavedEval));

// --------------------------------------------------------------------
// Esse codigo foi copiado do projeto trybetunes e é de autoria da trybe.
// --------------------------------------------------------------------

export const getSavedEval = () => {
  const SavedEval = readSavedEval();
  return SavedEval;
};

export const addEval = (Item) => {
  if (Item) {
    const SavedEval = readSavedEval();
    saveSavedEval([...SavedEval, Item]);
  }
};
