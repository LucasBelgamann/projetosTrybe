let squarePixel = document.getElementById('pixel-board');
let paletaDeCores = document.querySelector('#color-palette');

paletaDeCores.addEventListener('click', alteraCorSelecionada);

function alteraCorSelecionada(eventClick) {
  let corSelecionada = document.getElementsByClassName('selected')[0];
  corSelecionada.classList.remove('selected');
  eventClick.target.classList.add('selected');
}

function colorPixel(event2) {
  let palet = document.querySelector('.selected');
  let cor = getComputedStyle(palet).backgroundColor;
  event2.target.style.backgroundColor = cor;
}
squarePixel.addEventListener('click', colorPixel);

let btnClear = document.getElementById('clear-board');

btnClear.addEventListener('click', function () {
  let pixels = document.querySelectorAll('.pixel');
  for(let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
});

let input = document.getElementById('board-size');
let btnVqV = document.getElementById("generate-board");


function containerDeQuadrado(n) {
  for (let z = 0; z < n; z += 1) {
    let quebraLinha = document.createElement('div');
    quebraLinha.className = 'linha';
    for (let i = 0; i < n; i += 1) {
      let containers = document.createElement('div');
      containers.className = 'pixel';
      quebraLinha.appendChild(containers);
    }
    squarePixel.appendChild(quebraLinha);
  }
}
containerDeQuadrado(5);

function inputs(){
  let valorImput = document.getElementById('board-size').value;
  if (valorImput > 0){
    squarePixel.innerHTML = '';
    containerDeQuadrado(valorImput)
  } else if (valorImput <= 0) {
    return alert('Board inválido!')
  }
}
btnVqV.addEventListener('click', inputs);

