const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const btnEntrar = document.getElementById('entrar');
const btnCheckbox = document.getElementById('agreement');
const textArea = document.getElementById('textarea');
const contador = document.getElementById('counter');

function preencheForm() {
  if (inputEmail.value === 'tryber@teste.com' && inputSenha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
btnEntrar.addEventListener('click', preencheForm);

function habilitaCheckbox() {
  document.getElementById('submit-btn').removeAttribute('disabled');
}
btnCheckbox.addEventListener('change', habilitaCheckbox);

function contadorTexto() {
  const gastos = textArea.value.length;
  const inicial = 500;
  const resultado = gastos - inicial;
  contador.innerText = resultado;
}
textArea.addEventListener('keyup', contadorTexto);
