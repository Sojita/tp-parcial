const resultado = document.getElementById("resultado");
const inputBusqueda = document.getElementById("busqueda");
const selectContinente = document.getElementById("filtroContinente");
const selectOrden = document.getElementById("ordenNombre");

let todosLosPaises = [];

resultado.innerHTML = `<p id="loader">🔄 Cargando países...</p>`;

fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region")
  .then((response) => response.json())
  .then((data) => {
    todosLosPaises = data;
    mostrarPaises(todosLosPaises);
  })
  .catch((error) => {
    resultado.innerHTML = `<p style="color:red; font-weight:bold;">😓 No pudimos cargar los datos.</p>`;
    console.error("Error al obtener los países:", error);
  });

function mostrarPaises(paises) {
  resultado.innerHTML = "";
  resultado.classList.add("paises-grid");

  paises.forEach((pais) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-pais");

    tarjeta.innerHTML = `
      <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" />
      <h3><a href="detalle.html?pais=${encodeURIComponent(
        pais.name.common
      )}" target="_blank" rel="noopener noreferrer">${pais.name.common}</a></h3>
      <p>Continente: ${pais.region}</p>
      <p>Capital: ${pais.capital ? pais.capital[0] : "Sin datos"}</p>
    `;

    resultado.appendChild(tarjeta);
  });
}

function aplicarFiltros() {
  const texto = inputBusqueda.value.toLowerCase();
  const continenteSeleccionado = selectContinente.value;
  const ordenSeleccionado = selectOrden.value;

  let filtrados = todosLosPaises.filter((pais) => {
    const coincideNombre = pais.name.common.toLowerCase().includes(texto);
    const coincideContinente =
      continenteSeleccionado === "todos" ||
      pais.region === continenteSeleccionado;

    return coincideNombre && coincideContinente;
  });

  filtrados.sort((a, b) => {
    const nombreA = a.name.common.toLowerCase();
    const nombreB = b.name.common.toLowerCase();
    return ordenSeleccionado === "az"
      ? nombreA.localeCompare(nombreB)
      : nombreB.localeCompare(nombreA);
  });

  mostrarPaises(filtrados);
}

inputBusqueda.addEventListener("input", aplicarFiltros);
selectContinente.addEventListener("change", aplicarFiltros);
selectOrden.addEventListener("change", aplicarFiltros);
