document.addEventListener("DOMContentLoaded", function () {
  let loader = document.querySelector(".divPreloader");
  let colores = ["blanco"];

  function cambiarColor(img) {
    let ahora = new Date();
    console.log(ahora);

    let loaderElement = loader;
    loaderElement.style.display = "block";

    if (!img) {
      let color = colores[0];
      img = `img/tesla/modelS-${color}.jpg`;
    }

    let imgElement = document.createElement("img");
    imgElement.src = img;
    imgElement.classList.add("img-responsive");

    imgElement.addEventListener("load", function () {
      let ahora = new Date();
      console.log(ahora);

      let divVistaPrevia = document.querySelector(".divVistaPrevia");
      let existingImgElement = divVistaPrevia.querySelector("img");
      if (existingImgElement) {
        divVistaPrevia.removeChild(existingImgElement);
      }

      divVistaPrevia.appendChild(imgElement);
      loaderElement.style.display = "none";
    });
  }

  function init(opciones) {
    colores = opciones.colores || colores;

    let cmbColor = document.querySelector("#cmbColor");

    for (let i = 0; i < colores.length; i++) {
      let color = colores[i];
      const option = document.createElement("option");
      option.value = color;
      option.text = color;
      cmbColor.appendChild(option);
    }

    cmbColor.addEventListener("change", function () {
      let color = this.value;
      let url = `img/tesla/modelS-${color}.jpg`;

      cambiarColor(url);
    });

    cambiarColor();
  }

  init({
    colores: ["rojo", "cafe", "verde", "negro", "gris"],
  });
});
