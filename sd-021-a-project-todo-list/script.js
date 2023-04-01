const btnAdicionar = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');
const task = document.getElementById('texto-tarefa');
const btnLimpar = document.getElementById('apaga-tudo');
const sectionLi = document.getElementById('sectionDasLis');
const btnRemover = document.getElementById('remover-finalizados');
let lista2 = document.getElementsByClassName('lista');
const btnSalvar = document.getElementById('salvar-tarefas');

function createTask() {
  let newElement = document.createElement('li');
  newElement.innerText = task.value;
  newElement.classList = 'lista';
  taskList.appendChild(newElement);
  document.getElementById('texto-tarefa').value = '';
}
btnAdicionar.addEventListener('click', createTask);

function selectedElement() {
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('lista')) {
      for (let i = 0; i < lista2.length; i += 1) {
        lista2[i].classList.remove('backgroundList');
        event.target.classList.add('backgroundList');
      }
    }
  });
}
selectedElement();

document.addEventListener('dblclick', function (event2) {
  if (event2.target.classList.contains('completed')) {
    event2.target.classList.remove('completed');
  } else if (event2.target.classList.contains('lista')) {
    event2.target.classList.add('completed');
  }
});

function limpaLista() {
  taskList.innerHTML = '';
}

btnLimpar.addEventListener('click', limpaLista);

btnRemover.addEventListener('click', function () {
  const finalized = document.querySelectorAll('.completed');
  for (let index = 0; index < lista2.length; index += 1) {
    finalized[index].remove();
  }
});

btnSalvar.addEventListener('click', function () {
  const salvarItem = taskList.innerHTML;
  localStorage.setItem('lista-tarefa', salvarItem);
});

window.onload = function () {
  const listaSalva = localStorage.getItem('lista-tarefa');
  taskList.innerHTML = listaSalva;
};
