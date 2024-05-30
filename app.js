document.addEventListener("DOMContentLoaded", async () => {
  const arrows = document.querySelectorAll(".arrow");
  const movieLists = document.querySelectorAll(".movie-list");

  try {
    const response = await fetch('http://127.0.0.1:5000/movies');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    const movieList = document.getElementById('new-releases-list');
    // Vaciar el contenedor antes de agregar nuevas películas
    movieList.innerHTML = '';
    
    data.movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-list-item');
      movieItem.innerHTML = `
        <img class="movie-list-item-img" src="${movie.poster}" alt="${movie.movie_title}">
        <div class="movie-list-item-title">${movie.movie_title}</div>
        <div class="movie-list-item-desc">${movie.plot}</div>
        <button class="movie-list-item-button" onclick="handleReadMore(event)">Read More</button>
      `;
      movieList.appendChild(movieItem);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

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

  // DROPDOWN MENU
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const isLoggedIn = false; // Cambia este valor según el estado de inicio de sesión

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

  // TOGGLE
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

  // Function to handle "Read More" button
  window.handleReadMore = async function(event) {
    const movieItem = event.target.closest('.movie-list-item');
    const title = movieItem.querySelector('.movie-list-item-title').innerText;
    
    try {
      // Obtener revisiones
      const reviewsResponse = await fetch('http://127.0.0.1:5000/get-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movie_title: title })
      });
      
      if (!reviewsResponse.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const reviewsData = await reviewsResponse.json();
      console.log('Reviews:', reviewsData);
      // Aquí puedes agregar la lógica para mostrar las revisiones en tu interfaz de usuario
      
      // Guardar los detalles de la película en el almacenamiento local
      const desc = movieItem.querySelector('.movie-list-item-desc').innerText;
      const imgSrc = movieItem.querySelector('.movie-list-item-img').src;
      localStorage.setItem('movieTitle', title);
      localStorage.setItem('movieDesc', desc);
      localStorage.setItem('movieImg', imgSrc);
      
      // Redirigir a la página de revisión del usuario
      window.location.href = './Componentes/UserReview/Review.html';
    } catch (error) {
      console.error('Error al obtener las revisiones:', error);
    }
  };
});
