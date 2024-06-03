let btn = document.querySelector(".btn");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let textoTareas = document.querySelector(".textoTareas");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let text = input.value;
  let li = document.querySelector("li");
  let texto1 = document.querySelector(".texto1");
  texto1.textContent = text;

  li.appendChild(p);
  ul.appendChild(li);
});
