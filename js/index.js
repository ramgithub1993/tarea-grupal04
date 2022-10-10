"use strict";

//1. Cuando la página cargue deberán traer el listado de información sobre películas disponible en https://japceibal.github.io/japflix_api/movies-data.json, pero no mostrarlo al usuario.

//2. Cuando el usuario presiona el botón buscar, y si previamente ingresó algún valor en el campo de búsqueda, deberán mostrarle un listado con las películas que coincidan con dicha búsqueda en sus atributos de title o genres o tagline u overview. La información a mostrar en este punto será: title, tagline, y vote_average (en formato de "estrellas").

// 3. Cuando el usuario pulse en alguna de las películas mostradas, se deberá desplegar un contenedor superior con la siguiente información de dicha película: title, overview y lista de genres.

// 4. Añadir en lo anterior un botón con un desplegable que contenga el año de lanzamiento (sin el mes ni el día), la duación del largometraje, el presupuesto con el que contó y las ganancias obtenidas

// * ////////// DECLARACIONES //////////

// URL
const JAPLIX_URL = "https://japceibal.github.io/japflix_api/movies-data.json";

// Boton buscar
const BTN_BUSCAR = document.getElementById("btnBuscar");

// Contenedor donde se cargara la informacion
const CONTENEDOR = document.getElementById("lista");

// *OFFCANVAS
// Titulo offcanvas
const TITULO_OFFCANVAS = document.getElementById("offcanvasExampleLabel");

// Descripcion offcanvas
const DESCRIPCION_OFFCANVAS = document.getElementById("offcanvas-overview");

// Generos offcanvas
const GENRES_OFFCANVAS = document.getElementById("offcanvas-genres");

// *DROPDOWN
// Anio dropdown
const YEAR_DROPDOWN = document.getElementById("year");

// Runtime dropdown
const RUNTIME_DROPDOWN = document.getElementById("runtime");

// Budget dropdown
const BUDGET_DROPDOWN = document.getElementById("budget");

// Revenue dropdown
const REVENUE_DROPDOWN = document.getElementById("revenue");

//Iniciamos una lista vacia
let infoPeliculas = [];

// * ////////// FUNCIONES //////////

const getStars = (number) => {
  switch (number) {
    case 1:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 2:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 3:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`;
    case 4:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>`;
    case 5:
      return `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>`;
  }
};

// Funcion que hace el fetch a la URL y trae la data
let getData = function (url) {
  let result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};

// Funcion que agrega el titulo al offcanvas
const setOffcanvasTitle = (title) => {
  TITULO_OFFCANVAS.innerHTML = title;
};

// Funcion que agrega la overview al offcanvas
const setOffcanvasOverview = (overview) => {
  DESCRIPCION_OFFCANVAS.innerHTML = overview;
};

// Funcion que agrega los generos al offcanvas
const setOffcanvasGenres = (genres) => {
  let res = "";
  genres.forEach((element) => {
    res += `${element.name} - `;
  });

  GENRES_OFFCANVAS.innerHTML = res.slice(0, -2);
};

// Funcion que muestra el anio en el menu dropdown
const setDropdownYear = (year) => {
  YEAR_DROPDOWN.innerHTML = year.split("-")[0];
};

// Funcion que muestra la duracion de la pelicula en el menu dropdown
const setDropdownRuntime = (runtime) => {
  RUNTIME_DROPDOWN.innerHTML = `${runtime} mins`;
};

// Funcion que muestra el coste de la pelicula en el menu dropdown
const setDropdownBudget = (budget) => {
  BUDGET_DROPDOWN.innerHTML = `$ ${budget}`;
};

// Funcion que muestra el dinero recaudado de la pelicula en el menu dropdown
const setDropdownRevenue = (revenue) => {
  REVENUE_DROPDOWN.innerHTML = `$ ${revenue}`;
};

// Funcion que muestra la info al buscar
const mostrarINfo = (array) => {
  let info = "";

  if (array.length === 0) {
    CONTENEDOR.innerHTML = "";
  }

  array.forEach((element) => {
    info += `
        
    <li class=" list-group-item list-group-item-action h5 bg-dark custom-bg-hover p-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" id="${
      element.id
    }"> <div class="d-flex justify-content-between mb-2 mt-3 text-light"> ${
      element.title
    } <span> 
    
    ${getStars(Math.round(element.vote_average / 2))} 
    
    </span> </div> <p class="fst-italic text-muted fw-light"> ${
      element.tagline
    } </p> </li>
        
        `;
  });

  CONTENEDOR.innerHTML = info;

  // Bucle que muestra la info del offcanvas
  array.forEach((element) => {
    document.getElementById(element.id).onclick = () => {
      setOffcanvasTitle(element.title);
      setOffcanvasOverview(element.overview);
      setOffcanvasGenres(element.genres);
      setDropdownYear(element.release_date);
      setDropdownRuntime(element.runtime);
      setDropdownBudget(element.budget);
      setDropdownRevenue(element.revenue);
    };
  });
};

// * ////////// EVENTOS //////////

// Evento en el cual se trae la data haciendo uso de la funcion declarada previamente
document.addEventListener("DOMContentLoaded", function () {
  getData(JAPLIX_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoPeliculas = resultObj.data;
    }
  });
});

// ! FILTRAR ARRAY ANIDADA
// Evento al clickear en buscar

BTN_BUSCAR.onclick = () => {
  const conditionForFilteringGenre = (genre) =>
    genre.name.toLowerCase().includes(INPUT_BUSCAR);

  const INPUT_BUSCAR = document
    .getElementById("inputBuscar")
    .value.toLowerCase();

  mostrarINfo(
    infoPeliculas.filter(
      (pelicula) =>
        pelicula.title.toLowerCase().includes(INPUT_BUSCAR) ||
        pelicula.overview.toLowerCase().includes(INPUT_BUSCAR) ||
        pelicula.tagline.toLowerCase().includes(INPUT_BUSCAR) ||
        pelicula.genres.some((genre) => conditionForFilteringGenre(genre))
    )
  );
};
