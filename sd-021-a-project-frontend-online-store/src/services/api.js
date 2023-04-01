export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const getFetch = await fetch(url);
  const dataJson = await getFetch.json();
  return dataJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && !query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    return dataJson;
  }

  if (query && !categoryId) {
    const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const getFetch = await fetch(urlQuery);
    const dataJson = await getFetch.json();
    return dataJson;
  }

  if (query && categoryId) {
    const urlCat = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const getFetch = await fetch(urlCat);
    const dataJson = await getFetch.json();
    return dataJson;
  }
}

//  https://api.mercadolibre.com/sites/MLB/categories

// function 2
//  https://api.mercadolibre.com/sites/MLB/search?q=$QUERY <<
//  https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID <<
//  https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY <<
