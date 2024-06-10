import { tareas, guardarTareas, deleteTask } from "./api.js";
// Obtener referencias a los elementos del DOM
const inputTask = document.getElementById("inputTask");
const Btn = document.querySelector(".btn");
const papa = document.querySelector("#papa");
const texto = document.querySelector(".texto");
// Evento que se dispara cuando el contenido del DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", visualizar_datos);
// Función para visualizar las tareas almacenadas al cargar la página
async function visualizar_datos() {
  // Obtener las tareas desde el servidor
  let data = await tareas();
  // Iterar sobre cada tarea y crear su elemento correspondiente en el DOM
  data.forEach((task) => {
    crearElementoTarea(task);
  });
}
// Función para crear un elemento de tarea en el DOM
function crearElementoTarea(task) {
  // Crear un contenedor para la tarea
  const space = document.createElement("div");
  space.className = "space";
  space.id = `task-${task.id}`;
  papa.appendChild(space);
  // Crear un checkbox para la tarea
  const checkbox = document.createElement("input");
  checkbox.className = "check";
  checkbox.type = "checkbox";
  checkbox.id = `checkbox-${task.id}`; // Asignar un ID único a cada checkbox
  space.appendChild(checkbox);
  // Event listener para guardar el estado del checkbox en el almacenamiento local cuando cambia
  checkbox.addEventListener("change", function () {
    actualizarContador();
    // Guardar el estado del checkbox en el almacenamiento local
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
  // Restaurar el estado de los checkbox al cargar la página
  const isChecked = localStorage.getItem(checkbox.id) === "true";
  checkbox.checked = isChecked;
  // Crear un elemento para mostrar el texto de la tarea
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  space.appendChild(taskDiv);
  taskDiv.innerHTML = task.task;
  // Crear un elemento para la papelera y agregar un event listener para eliminar la tarea
  const basurero = document.createElement("div");
  basurero.className = "basurero";
  basurero.innerHTML = "🗑️";
  space.appendChild(basurero);
  basurero.addEventListener("click", function () {
    deleteTask(task.id).then(() => {
      papa.removeChild(space);
      if (papa.children.length === 0) {
        texto.style.display = "block";
      }
      // Actualizar el contador después de eliminar una tarea
      actualizarContador();
    });
  });
  texto.style.display = "none";
}
// Función para contar y mostrar la cantidad de tareas marcadas
let contador = 0;
function actualizarContador() {
  contador = 0;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');// aqui llamamos a todos los checkbox
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      contador++;
    }
  });
  // Mostrar el contador en algún lugar de la página
  // Por ejemplo, en un elemento con la clase "contador"
  const contadorElement = document.querySelector(".contador");
  if (contadorElement) {
    contadorElement.textContent = contador;
  }
}
// Event listener para agregar una nueva tarea cuando se hace clic en el botón
Btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputTask.value !== "") {
    const newTask = inputTask.value;
    guardarTareas(newTask).then((task) => {
      crearElementoTarea(task);
    });
    setTimeout(() => {
      inputTask.value = "";
    }, 80);
  }
});
