const contenedor = document.getElementById("detalle");

if (!contenedor) {
  console.error("No se encontró el contenedor con id 'detalle'");
}

const params = new URLSearchParams(window.location.search);
const nombrePais = params.get("pais");

if (!nombrePais) {
  contenedor.innerHTML = "<p>No se proporcionó ningún país en la URL.</p>";
} else {
  fetch("https://restcountries.com/v3.1/name/" + nombrePais + "?fullText=true")
    .then((res) => res.json())
    .then((data) => {
      const pais = data[0];
      if (!pais) {
        contenedor.innerHTML =
          "<p>No se encontró información para ese país.</p>";
        return;
      }

      contenedor.innerHTML = `
        <article class="tarjeta-pais">
          <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" />
          <h2>${pais.name.common}</h2>
          <ul>
            <li><strong>Capital:</strong> ${
              pais.capital ? pais.capital[0] : "Sin datos"
            }</li>
            <li><strong>Continente:</strong> ${pais.region}</li>
            <li><strong>Población:</strong> ${pais.population.toLocaleString()}</li>
            <li><strong>Área:</strong> ${pais.area.toLocaleString()} km²</li>
            <li><strong>Subregión:</strong> ${
              pais.subregion || "Sin datos"
            }</li>
          </ul>
        </article>
      `;
    })
    .catch((error) => {
      contenedor.innerHTML = "<p>Error al cargar los datos del país.</p>";
      console.error("Error al obtener el país:", error);
    });
}
