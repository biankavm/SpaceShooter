// AJAX é uma técnica que permite que páginas web se comuniquem
// com o servidor em segundo plano, sem recarregar a página.

function deleteMajor(majorIdToDelete) {
  // Faz requisição AJAX ao servidor
  fetch(`/majors/destroy/${majorIdToDelete}`, { method: 'POST' })
    .then(response => {
      if (response.ok) {
        console.log('Curso deletado com sucesso!');
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Erro ao deletar o curso:', error);
    });
}

function deleteUser(userIdToDelete) {
  fetch(`/users/destroy/${userIdToDelete}`, { method: 'POST' })
    .then(response => {
      if (response.ok) {
        console.log('Usuário deletado com sucesso!');
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Erro ao deletar o usuário:', error);
    });
}

function saveScore(score) {
  fetch(`/users/saveScore/${score}`, {
    method: 'POST',
  })
    .then(response => {
      if (response.ok) {
        console.log('Pontuação salva com sucesso!');
      }
    })
    .catch(error => {
      console.error('Erro ao salvar a pontuação:', error);
    });
}

function togglePassword() {
  const passwordFields = document.querySelectorAll('input[type="password"]');

  passwordFields.forEach(passwordField => {
    const togglePasswordButton =
      passwordField.parentElement?.querySelector('#toggle-password');
    const togglePasswordIcon = passwordField.parentElement?.querySelector(
      '#toggle-password-icon'
    );

    if (togglePasswordButton && togglePasswordIcon) {
      togglePasswordButton.addEventListener('click', () => {
        const type =
          passwordField.getAttribute('type') === 'password'
            ? 'text'
            : 'password';
        passwordField.setAttribute('type', type);
        togglePasswordIcon.classList.toggle('bi-eye');
        togglePasswordIcon.classList.toggle('bi-eye-slash');
      });
    }
  });
}

togglePassword();
