const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const LoginMessage = document.getElementById('LoginMessage');
const RegisterMessage = document.getElementById('RegisterMessage');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    LoginMessage.textContent = 'Enter your personal details to use all of site features';
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
        LoginMessage.textContent = 'Please enter both username and password.';
        return;
    }

    const userData = {
        username: username,
        password: password
    };

    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Failed to log in');
        }
    })
    .then(data => {
        console.log('Usuario conectado:', data);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        window.location.href = '../../index.html';
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        LoginMessage.textContent = 'Login failed. Please check your credentials and try again.';
    });
});


  RegisterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(RegisterForm);
    const publisher = formData.get('publisher');
    const username = formData.get('username');
    const password = formData.get('password');
  
    // Verificar que ambos campos estén completos antes de continuar
    if (!username && !password && !publisher) {
      LoginMessage.textContent = 'Please enter all Data.';
      return;
    }
      // Crear un objeto con los datos del usuario
    const userData = {
      username: username,
      password: password
    };

    // Realizar la solicitud POST utilizando fetch
    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        // Realizar acciones adicionales si es necesario después de registrar
        console.log('Usuario registrado:', data);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        window.location.href = '../../index.html'; // Redirigir a la página principal
    })
    .catch(error => {
        console.error('Error al registrar usuario:', error);
        // Manejar errores si es necesario
    });
});