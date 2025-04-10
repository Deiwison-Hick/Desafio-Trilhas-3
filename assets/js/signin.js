let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
    
    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
});

function entrar() {
    let usuario = document.querySelector('#usuario');
    let senha = document.querySelector('#senha');
    let msgError = document.querySelector('#msgError');
    
    // Recupera lista de usuários do localStorage
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    
    // Busca usuário válido
    let userValid = listaUser.find(item => 
        usuario.value === item.userCad && 
        senha.value === item.senhaCad
    );

    if (userValid) {
        // ★★★ AJUSTE PRINCIPAL ★★★
        // Redirecionamento CORRETO para formulario.html na raiz
        window.location.href = '../../formulario.html';
        
        // Gera token e salva dados do usuário
        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify({
            nome: userValid.nomeCad,
            user: userValid.userCad,
            senha: userValid.senhaCad
        }));
    } else {
        // Estiliza erros
        document.querySelectorAll('#userLabel, #senhaLabel').forEach(el => {
            el.style.color = 'red';
        });
        document.querySelectorAll('#usuario, #senha').forEach(el => {
            el.style.borderColor = 'red';
        });
        
        // Mostra mensagem de erro
        msgError.style.display = 'block';
        msgError.textContent = 'Usuário ou senha incorretos';
        usuario.focus();
    }
}