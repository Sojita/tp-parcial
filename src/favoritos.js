const lista = document.getElementById("favoritos-lista");
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

if (favoritos.length === 0) {
  lista.innerHTML =
    "<p style='text-align:center;'>⚠️ No hay países favoritos guardados.</p>";
} else {
  Promise.all(
    favoritos.map((nombre) =>
      fetch(
        "https://restcountries.com/v3.1/name/" + nombre + "?fullText=true"
      ).then((res) => res.json())
    )
  )
    .then((respuestas) => {
      respuestas.forEach((data) => {
        const pais = data[0];

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-pais");

        tarjeta.innerHTML = `
          <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" />
          <h3><a href="detalle.html?pais=${encodeURIComponent(
            pais.name.common
          )}" target="_blank">
            ${pais.name.common}</a></h3>
          <p>Continente: ${pais.region}</p>
          <p>Capital: ${pais.capital ? pais.capital[0] : "Sin datos"}</p>
        `;

        lista.appendChild(tarjeta);
      });
    })
    .catch((error) => {
      console.error("Error al cargar favoritos:", error);
      lista.innerHTML =
        "<p style='color:red; text-align:center;'>No se pudieron cargar los favoritos.</p>";
    });
}
