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

    // Verificar que ambos campos estén completos antes de continuar
    if (!username && !password) {
      LoginMessage.textContent = 'Please enter both username and password.';
      return;
    }else if (!username) {
      LoginMessage.textContent = 'Please enter your username.';
      return;
    }else if (!password) {
      LoginMessage.textContent = 'Please enter your password.';
      return;
    }

      container.classList.remove("active");
      LoginMessage.textContent = 'Enter your new user details to use all of site features';
      RegisterMessage.textContent = 'Enter your personal details to use all of site features';
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);        // Redirigir a index.html
      window.location.href = '../../index.html';
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
        container.classList.remove("active");
        LoginMessage.textContent = 'Enter your new user details to use all of site features';
        RegisterMessage.textContent = 'Enter your personal details to use all of site features';
        sessionStorage.setItem('publisher', publisher);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        // Redirigir a index.html
        window.location.href = '../../index.html';

  });