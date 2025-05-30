const btnBuscar = document.getElementById("boton-src");
const btnLimpiar = document.getElementById("boton-clear");
const contenedorPadre = document.getElementById("contenedor-data");
const urlDragonBall = "https://dragonball-api.com/api/characters";



const cargarDatos = async (urlDragonBall) => {
  try {
    const response = await fetch(urlDragonBall);

    if (!response.ok) {
      throw new error("Error en la API");
    }

    const data = await response.json();


    return data;
  } catch (error) {
    console.log(error);
  }
};


// const respuesta = await fetch(`${urlDragonBall}?name=${nombre}`);

let thingy = 0;
btnLimpiar.addEventListener("click", async () => {
  contenedorPadre.innerHTML = ""
});

const verDetalles = async (id) => {
  try {
    const response = await fetch(`${urlDragonBall}/${id}`);

    if (!response.ok) {
      throw new error("Error en la API");
    }

    const data = await response.json();

    if(data.items){
      return data.items
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

 // const dataPersonajes = await cargarDatos(urlDragonBall);
 // console.log(dataPersonajes);
 // contenedorPadre.innerHTML = ""

btnBuscar.addEventListener("click", async () => {
  let nombre = document.getElementById("area-busqueda").value;
  


  let dataPersonajes = await cargarDatos(`${urlDragonBall}?name=${nombre}`);
  console.log(dataPersonajes);
  contenedorPadre.innerHTML = ""
  
  dataPersonajes.forEach((personaje) => {
    contenedorPadre.innerHTML += `
          <div id="thingyBingy" class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
            <div class="card">
              <img
                class="card-img-top"
                src='${personaje.image}'
              />
              <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                <button class="btn btn-success btn-ver-detalles">Ver más</button>
              </div>
            </div>
          </div>
      `;
  });

});

contenedorPadre.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-ver-detalles")) {
    // accediendo al padre mas cercano
    const cardPadre = e.target.closest(".col-3");
    const id = cardPadre.dataset.id;

    verDetalles(id);
  }
});
