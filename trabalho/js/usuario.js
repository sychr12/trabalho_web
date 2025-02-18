function register() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // Envia os dados via AJAX para o servidor
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUsername,
            password: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html';  // Redireciona para a tela de login
        } else {
            alert('Erro ao registrar usuário.');
        }
    })
    .catch(error => {
        console.error('Erro ao registrar usuário:', error);
    });
}
