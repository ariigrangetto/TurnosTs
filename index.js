"use strict";
console.log("hola");
const $container = document.querySelector(".containerWithDisplay");
const $btn = document.getElementById("btn");
const $turnos = document.getElementById("sectionTurnos");
const $turnosGuardados = document.getElementById("turnosGuardados");
const $icon = document.querySelector(".iconForForm");
//si no le especifico el tipo de html que es, me da por defecto element | null;
$btn.addEventListener("click", function () {
    console.log("agregar nuevo turno");
    createTurno();
});
const createTurno = () => {
    let div = document.createElement("div");
    div.setAttribute("id", "formularioTurno");
    div.innerHTML = `
  <div id="turnos">
        <div id="secondTurn"> 
          <h2 id="textFormulario">Agregando turno:</h2>
          <!-- Nombre de cliente -->
          <p id="nameText"">Nombre de cliente:</p>
          <input type="text" id="name" placeholder="Nombre:">

          <!-- Opciones uñas o peluqueria -->
          <select name="uñas" id="select">
            <option value="uñas">Uñas</option>
            <option value="peluqueria">Peluqueria</option>
          </select>

          <!-- Fecha y hora -->
          <p id="dateTime">Fecha y hora de turno:</p>
          <div class="timedate"><input type="date" id="date"> <input type="time" id="time"></div>

          <!-- Motivo de turno -->
          <input type="text" id="motive" placeholder="Motivo del turno:">
        </div>

        <!-- Boton agregar -->
        <button id="add">Agregar</button>
      </div>
  `;
    $turnos.appendChild(div);
    $turnos
        ? ($container.style.display = "none")
        : ($container.style.display = "block");
    const fecha = new Date().toISOString().split("T")[0];
    const hora = new Date().toTimeString().slice(0, 5);
    const $time = document.getElementById("time");
    $time.value = hora;
    const $btnAdd = div.querySelector("#add");
    $btnAdd === null || $btnAdd === void 0 ? void 0 : $btnAdd.addEventListener("click", function () {
        saveTurno();
    });
};
let turnos = JSON.parse(localStorage.getItem("dataTurnos") || "[]");
function saveTurno() {
    const nuevoTurno = {
        fecha: document.getElementById("date").value,
        hora: document.getElementById("time").value,
        clienta: document.getElementById("name").value,
        seccion: document.getElementById("select").value,
        motivo: document.getElementById("motive").value,
    };
    turnos.push(nuevoTurno);
    saveData();
    renderTurnos();
    const $formularioTurno = document.getElementById("formularioTurno");
    $formularioTurno.remove();
}
function saveData() {
    localStorage.setItem("dataTurnos", JSON.stringify(turnos));
}
renderTurnos();
function renderTurnos() {
    turnos.length > 0
        ? (($container.style.display = "none"), ($icon.style.display = "block"))
        : (($container.style.display = "block"), ($icon.style.display = "none"));
    turnos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    turnos.sort((a, b) => new Date(a.hora).getTime() - new Date(b.hora).getTime());
    $turnosGuardados.innerHTML = "";
    turnos.forEach((turno, index) => {
        let turnoDiv = document.createElement("div");
        turnoDiv.setAttribute("id", "turnoDiv");
        turnoDiv.innerHTML = `
     <div id="dataturnos">
          <div id="sectionData">
            <h2 id="h1DataTurnos">Turno pendiente:</h2>
            <div id="saveData">
            <p>Fecha: ${turno.fecha} <br>
               Hora: ${turno.hora} <br>
               Clienta: ${turno.clienta} <br>
               Seccion: ${turno.seccion} <br>
               Motivo: ${turno.motivo} <br>
              <button id="delete-${index}" class="delete">
              Eliminar turno
              </button>
            </div>
          </div>
        </div>
    `;
        $turnosGuardados.appendChild(turnoDiv);
        const $delete = turnoDiv.querySelector(`#delete-${index}`);
        $delete.addEventListener("click", function () {
            deleteTurno(index);
        });
    });
}
function deleteTurno(index) {
    turnos.splice(index, 1);
    saveData();
    renderTurnos();
}
