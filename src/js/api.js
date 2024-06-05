
let btn = document.querySelector(".btn")
let input = document.getElementById("inputTask").value;


btn.addEventListener("click", function(){
    guardarTareas();
})

async function guardarTareas() {
        try {
          const response = await fetch("http://localhost:3000/api/task/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              task: input, 
            }),
          });
      
          const data = await response.json(); 
          console.log(data);
        } catch (error) {
          console.error("Error", error);
        }
}

async function tareas() {
  try {
    const response = await fetch("http://localhost:3000/api/task/");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export{ tareas, guardarTareas};