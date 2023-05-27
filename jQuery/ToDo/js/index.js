$(document).ready(function () {
  const formulario = $("#formulario");
  const input = $("#input");
  const listaTareas = $("#lista-tareas");
  const template = $("#template").html();
  const fragment = document.createDocumentFragment();
  let tareas = {};

  $(document).on("DOMContentLoaded", function () {
    if (localStorage.getItem("tareas")) {
      tareas = JSON.parse(localStorage.getItem("tareas"));
    }
    pintarTareas();
  });

  listaTareas.on("click", function (event) {
    btnAccion(event);
  });

  formulario.on("submit", function (event) {
    event.preventDefault();
    console.log("procesando formulario");
    setTarea(event);
  });

  const setTarea = function (event) {
    if (input.val().trim() === "") {
      console.log("Está vacío");
      return;
    }

    const tarea = {
      id: Date.now(),
      texto: input.val(),
      estado: false,
    };

    tareas[tarea.id] = tarea;

    formulario[0].reset();
    input.focus();

    pintarTareas();
  };

  const pintarTareas = () => {
    if (Object.values(tareas).length === 0) {
      listaTareas.empty();

      const div = $("<div>").addClass("alert alert-dark text-center");
      const p = $("<p>").text("No hay tareas pendientes 🤩");

      div.append(p);
      listaTareas.append(div);
      return;
    }

    listaTareas.empty();
    Object.values(tareas).forEach((tarea) => {
      const clone = $(template).clone();
      clone.find("p").html(tarea.texto); // Usa .html() en lugar de .text()

      if (tarea.estado === true) {
        clone
          .find(".alert")
          .removeClass("alert-warning")
          .addClass("alert-primary");

        clone
          .find(".fa-solid:eq(0)")
          .removeClass("fa-circle-check")
          .addClass("fa-rotate-left");

        clone.find("p").css("text-decoration", "line-through");
      }

      // clone.find(".fa-circle-check, .fa-circle-minus").data("id", tarea.id);
      clone.find(".fa-solid:eq(0)").data("id", tarea.id);
      clone.find(".fa-solid:eq(1)").data("id", tarea.id);

      fragment.appendChild(clone.get(0)); // Modificado para agregar el elemento clonado al fragmento
    });

    listaTareas.append(fragment); // Movido para agregar el fragmento completo a la lista de tareas
  };

  const btnAccion = function (event) {
    if ($(event.target).hasClass("fa-circle-check")) {
      tareas[$(event.target).data("id")].estado = true;
      pintarTareas();
    }

    if ($(event.target).hasClass("fa-circle-minus")) {
      delete tareas[$(event.target).data("id")];
      pintarTareas();
    }

    if ($(event.target).hasClass("fa-rotate-left")) {
      tareas[$(event.target).data("id")].estado = false;
      pintarTareas();
    }

    event.stopPropagation();
  };
});

// $(document).ready(function () {
//   const formulario = $("#formulario");
//   const input = $("#input");
//   const listaTareas = $("#lista-tareas");
//   const template = $("#template").html();
//   const fragment = $("<div>").get(0);
//   let tareas = {};

//   formulario.on("submit", function (event) {
//     event.preventDefault();
//     setTarea(event);
//   });

//   listaTareas.on("click", function (event) {
//     btnAccion(event); // Corregido el nombre de la función
//   });

//   const setTarea = (event) => {
//     if (input.val().trim() === "") return;

//     const tarea = {
//       id: Date.now(),
//       text: input.val(),
//       estado: false,
//     };

//     tareas[tarea.id] = tarea;

//     input.val("");
//     input.focus();

//     pintarTarea();
//   };

//   const pintarTarea = () => {
//     if (Object.values(tareas).length === 0) {
//       listaTareas.empty();

//       const div = $("<div>").addClass("alert alert-dark text-center");
//       const p = $("<p>").text("No hay tareas pendientes 🤩");

//       div.append(p);
//       listaTareas.append(div);
//       return;
//     }

//     listaTareas.empty();
//     Object.values(tareas).forEach((tarea) => {
//       const clone = $(template).clone();

//       clone.find("p").text(tarea.text); // Corregido el nombre de la propiedad "texto"

//       if (tarea.estado === true) {
//         clone
//           .find(".alert")
//           .removeClass("alert-warning")
//           .addClass("alert-primary");

//         clone
//           .find(".fa-solid")
//           .eq(0)
//           .removeClass("fa-circle-check")
//           .addClass("fa-rotate-left");

//         clone.find("p").css("text-decoration", "line-through");

//         clone.find(".fa-circle-check, .fa-circle-minus").data("id", tarea.id);

//         fragment.append(clone);
//       }
//     });
//     listaTareas.append(fragment);
//   };

//   const btnAccion = (event) => {
//     if ($(event.target).hasClass("fa-circle-check")) {
//       tareas[$(event.target).data("id")].estado = true;
//       pintarTarea();
//     }

//     if ($(event.target).hasClass("fa-circle-minus")) {
//       delete tareas[$(event.target).data("id")];
//       pintarTarea();
//     }

//     if ($(event.target).hasClass("fa-rotate-left")) {
//       tareas[$(event.target).data("id")].estado = false;
//       pintarTarea();
//     }

//     event.stopPropagation();
//   };
// });
