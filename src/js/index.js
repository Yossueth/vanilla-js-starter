import { tareas, guardarTareas } from "./api.js";

const inputTask = document.getElementById("inputTask");
const Btn = document.querySelector(".btn");
const papa = document.querySelector("#papa");
const texto = document.querySelector(".texto");

async function visualizar_datos() {
  let data = await tareas();
  console.log(data);
  return data;
}

let datosJSON = visualizar_datos();
console.log(datosJSON);

Btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputTask.value !== "") {
    const space = document.createElement("div");
    space.id = "space";
    papa.appendChild(space);

    const check = document.createElement("input");
    check.id = "check";
    check.type = "checkbox";
    space.appendChild(check);

    const task = document.createElement("div");
    task.id = "task";
    space.appendChild(task);
    task.innerHTML = inputTask.value;

    texto.innerHTML = "";
    texto.style.display = "none";
  }

  guardarTareas(inputTask.value);
});
