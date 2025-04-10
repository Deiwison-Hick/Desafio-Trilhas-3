document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const btn = document.querySelector('#verSenha');
  const btnConfirm = document.querySelector('#verConfirmSenha');
  const nome = document.querySelector('#nome');
  const labelNome = document.querySelector('#labelNome');
  const usuario = document.querySelector('#usuario');
  const labelUsuario = document.querySelector('#labelUsuario');
  const senha = document.querySelector('#senha');
  const labelSenha = document.querySelector('#labelSenha');
  const confirmSenha = document.querySelector('#confirmSenha');
  const labelConfirmSenha = document.querySelector('#labelConfirmSenha');
  const msgError = document.querySelector('#msgError');
  const msgSuccess = document.querySelector('#msgSuccess');

  // Estados de validação
  let validNome = false;
  let validUsuario = false;
  let validSenha = false;
  let validConfirmSenha = false;

  // Funções de validação
  function validarNome() {
      if (nome.value.length <= 2) {
          exibirErroCampo(labelNome, 'Nome *Insira no mínimo 3 caracteres');
          validNome = false;
      } else {
          exibirSucessoCampo(labelNome, 'Nome');
          validNome = true;
      }
  }

  function validarUsuario() {
      if (usuario.value.length <= 4) {
          exibirErroCampo(labelUsuario, 'Usuário *Insira no mínimo 5 caracteres');
          validUsuario = false;
      } else {
          exibirSucessoCampo(labelUsuario, 'Usuário');
          validUsuario = true;
      }
  }

  function validarSenha() {
      if (senha.value.length <= 5) {
          exibirErroCampo(labelSenha, 'Senha *Insira no mínimo 6 caracteres');
          validSenha = false;
      } else {
          exibirSucessoCampo(labelSenha, 'Senha');
          validSenha = true;
      }
      validarConfirmacaoSenha(); // Atualiza a confirmação quando a senha muda
  }

  function validarConfirmacaoSenha() {
      if (senha.value !== confirmSenha.value) {
          exibirErroCampo(labelConfirmSenha, 'Confirmar Senha *As senhas não conferem');
          validConfirmSenha = false;
      } else {
          exibirSucessoCampo(labelConfirmSenha, 'Confirmar Senha');
          validConfirmSenha = true;
      }
  }

  // Funções auxiliares
  function exibirErroCampo(elemento, mensagem) {
      elemento.style.color = 'red';
      elemento.innerHTML = mensagem;
      elemento.previousElementSibling.style.borderColor = 'red';
  }

  function exibirSucessoCampo(elemento, mensagem) {
      elemento.style.color = 'green';
      elemento.innerHTML = mensagem;
      elemento.previousElementSibling.style.borderColor = 'green';
  }

  function toggleSenha(input, botao) {
      const tipo = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', tipo);
      botao.classList.toggle('fa-eye-slash');
  }

  // Event Listeners
  nome.addEventListener('keyup', validarNome);
  usuario.addEventListener('keyup', validarUsuario);
  senha.addEventListener('keyup', validarSenha);
  confirmSenha.addEventListener('keyup', validarConfirmacaoSenha);

  btn.addEventListener('click', () => toggleSenha(senha, btn));
  btnConfirm.addEventListener('click', () => toggleSenha(confirmSenha, btnConfirm));

  // Função principal de cadastro
  window.cadastrar = function() {
      // Validação final antes de enviar
      validarNome();
      validarUsuario();
      validarSenha();
      validarConfirmacaoSenha();

      if (validNome && validUsuario && validSenha && validConfirmSenha) {
          const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
          
          // Verifica se usuário já existe
          const usuarioExistente = listaUser.some(user => user.userCad === usuario.value);
          
          if (usuarioExistente) {
              msgError.innerHTML = '<strong>Este usuário já está cadastrado!</strong>';
              msgError.style.display = 'block';
              msgSuccess.style.display = 'none';
              return;
          }

          // Adiciona novo usuário
          listaUser.push({
              nomeCad: nome.value.trim(),
              userCad: usuario.value.trim(),
              senhaCad: senha.value
          });

          localStorage.setItem('listaUser', JSON.stringify(listaUser));

          // Feedback visual
          msgSuccess.innerHTML = '<strong>Cadastro realizado com sucesso!</strong>';
          msgSuccess.style.display = 'block';
          msgError.style.display = 'none';

          // Redireciona após 2 segundos
          setTimeout(() => {
              window.location.href = '../html/signin.html';
          }, 2000);
      } else {
          msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
          msgError.style.display = 'block';
          msgSuccess.style.display = 'none';
      }
  };
});