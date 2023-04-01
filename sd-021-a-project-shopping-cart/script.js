 const ol = document.querySelector('.cart__items');
 const paragrafo = document.createElement('p');
 const sectionCart = document.querySelector('.cart');
 paragrafo.className = 'total-price';
 paragrafo.innerText = 0;
 sectionCart.appendChild(paragrafo);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const somaTotal = () => {
  const cartItem = document.querySelectorAll('.cart__items');
  let total = 0;
  if (cartItem === 0) {
    total += 0;
  }
  cartItem.forEach((element) => {
  const item = parseFloat(element.innerHTML.split('$')[1]);
  total += item;
  });
  paragrafo.innerText = total;
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const btnEsvaziar = document.querySelector('.empty-cart');
btnEsvaziar.addEventListener('click', () => {
  localStorage.removeItem('cartItems');
  ol.innerHTML = '';
  saveCartItems(ol.innerHTML);
  somaTotal();
});

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(ol.innerHTML);
  somaTotal();
}

const removeLocal = () => {
  ol.innerHTML = getSavedCartItems('cartItems');
  for (let index = 0; index < ol.children.length; index += 1) {
    const li = ol.children[index];
    li.addEventListener('click', cartItemClickListener);
  }
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const carrinhoAdd = async (evento) => {
  const section = evento.target.parentNode;
  const idProduto = getSkuFromProductItem(section);
  const resposta = await fetchItem(idProduto);
  const { id, title, price } = resposta;
  const item = createCartItemElement({ sku: id, name: title, salePrice: price });
  ol.appendChild(item);
  saveCartItems(ol.innerHTML);
  somaTotal();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAdd.addEventListener('click', carrinhoAdd);
  section.appendChild(btnAdd);
  return section;
}

async function criarProdutos() {
  const sectionItem = document.querySelector('.items');
  const carregando = document.createElement('span');
  carregando.classList = 'loading';
  carregando.innerText = 'carregando...';
  sectionItem.appendChild(carregando);

  const products = await fetchProducts('computador');
  sectionItem.removeChild(carregando);
  const { results } = products;
  results.forEach((product) => {
    const [sku, name, image] = [product.id, product.title, product.thumbnail];
    const section = createProductItemElement({ sku, name, image });
    const pai = document.querySelector('.items');
    pai.appendChild(section);
  });
}
window.onload = () => { 
  removeLocal();
  criarProdutos();
  somaTotal();
};
