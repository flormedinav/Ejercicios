const formulario = document.getElementById("formulario");
const input = document.getElementById("input");
const listaTarea = document.getElementById("lista-tareas");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
let tareas = {};
// const tareas = {
//   12324234242: {
//     id: 12324234242,
//     texto: "Tarea 1",
//     estado: false,
//   },
//   12324234555: {
//     id: 12324234555,
//     texto: "Tarea 1",
//     estado: false,
//   },
// };

//El DOMContentLoader se dispara cuando el HTML a sido completamente cargado y parseado.En este caso queremos que cuando arranque el código se pinte siempre las tareas por default que hay cargadas.
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  pintarTareas();
});

listaTarea.addEventListener("click", (event) => {
  btnAccion(event);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("procesando formulario");
  //Alternativas para acceder al valor del input:
  // event.target[0].value;
  // event.target.querySelector("input");
  // input.value;
  setTarea(event);
});

const setTarea = (event) => {
  //Validamos que no este vacío
  if (input.value.trim() === "") {
    console.log("Está vacío");
    return;
  }

  //Creamos una nueva tarea
  const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false,
  };

  //Agregamos la tarea al objeto de tareas
  tareas[tarea.id] = tarea;

  //Este es para que al dar enter se borre lo que hay en el input
  formulario.reset();
  //Este es para que quede siempre seleccionado el input. También hay que agregar el atributo autofocus en el input html
  input.focus();

  pintarTareas();
};

const pintarTareas = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas));

  if (Object.values(tareas).length === 0) {
    listaTarea.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("alert", "alert-dark", "text-center");

    const p = document.createElement("p");
    p.textContent = "No hay tareas pendientes 🤩";

    div.appendChild(p);
    listaTarea.appendChild(div);
    return;
  }

  listaTarea.innerHTML = "";
  Object.values(tareas).forEach((tarea) => {
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = tarea.texto;

    if (tarea.estado === true) {
      clone
        .querySelector(".alert")
        .classList.replace("alert-warning", "alert-primary");

      clone
        .querySelectorAll(".fa-solid")[0]
        .classList.replace("fa-circle-check", "fa-rotate-left");

      clone.querySelector("p").style.textDecoration = "line-through";
    }

    //Le agregamos data-id a los iconos para poder después saber a que tarea corresponden.
    clone.querySelectorAll(".fa-solid")[0].dataset.id = tarea.id;
    clone.querySelectorAll(".fa-solid")[1].dataset.id = tarea.id;

    fragment.appendChild(clone);
  });
  listaTarea.appendChild(fragment);
};

const btnAccion = (event) => {
  // console.log(e.target.classList.contains("fa-circle-check"));
  if (event.target.classList.contains("fa-circle-check")) {
    tareas[event.target.dataset.id].estado = true;
    pintarTareas();
  }

  if (event.target.classList.contains("fa-circle-minus")) {
    delete tareas[event.target.dataset.id];
    pintarTareas();
  }

  if (event.target.classList.contains("fa-rotate-left")) {
    tareas[event.target.dataset.id].estado = false;
    pintarTareas();
  }

  //Con este método evitamos que cuando se haga click en el botón se activen otros eventos que están fuera del div donde quiero que se ejecute.
  event.stopPropagation();
};
