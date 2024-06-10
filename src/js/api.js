async function guardarTareas(tarea) {
  try {
    const response = await fetch("http://localhost:3000/api/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: tarea,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data; // Devolver la tarea creada
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
async function deleteTask(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Task ${id} deleted`);
      return true;
    } else {
      console.error("Error deleting task:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
export { tareas, guardarTareas, deleteTask };
