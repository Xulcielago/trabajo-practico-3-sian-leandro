const btnBuscar = document.getElementById("boton-src");
const btnLimpiar = document.getElementById("boton-clear");
const contenedorPadre = document.getElementById("contenedor-data");
const urlDragonBall = "https://dragonball-api.com/api/characters?limit=58";
let dataPersonajes;


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


// Botón de Limpiar
btnLimpiar.addEventListener("click", async () => {
  contenedorPadre.innerHTML = ""
});

// Botón de Búsqueda por nombre
btnBuscar.addEventListener("click", async () => {
  let campo_busqueda = document.getElementById("area-busqueda").value;
  
  if (!campo_busqueda) {
    const data = await cargarDatos(urlDragonBall);
    dataPersonajes = data.items;
    alert("Ningún personaje seleccionado, mostrando todos.");
    
  } else {
    dataPersonajes = await cargarDatos(`${urlDragonBall}&name=${campo_busqueda}`);
  }
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
