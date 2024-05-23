const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//DROPDOWN MENU
const dropdownMenu = document.querySelector('.dropdown-menu');
const isLoggedIn = false; // Cambia este valor según el estado de inicio de sesión

//Actualizar menú desplegable si hay o no un usuario loggeado
function updateDropdownMenu() {
  dropdownMenu.innerHTML = '';

  if (isLoggedIn) {
    const profileItem = document.createElement('li');
    profileItem.classList.add('dropdown-item');
    profileItem.textContent = 'Profile';
    dropdownMenu.appendChild(profileItem);

    const signOutItem = document.createElement('li');
    signOutItem.classList.add('dropdown-item');
    signOutItem.textContent = 'Sign Out';
    dropdownMenu.appendChild(signOutItem);
  } else {
    const signInItem = document.createElement('li');
    signInItem.classList.add('dropdown-item');
    signInItem.textContent = 'Log In/Sign Up';
    dropdownMenu.appendChild(signInItem);

    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        const targetPage = item.textContent.replace(' ', '');
        window.location.href = `./Componentes/LogIn/LogIn.html`;
      });
    });
  }
}
updateDropdownMenu();

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});
