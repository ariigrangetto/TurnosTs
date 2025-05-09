console.log("hola");

const $container = document.querySelector(
  ".containerWithDisplay"
) as HTMLDivElement;
const $btn = document.getElementById("btn") as HTMLButtonElement;
const $turnos = document.getElementById("sectionTurnos") as HTMLElement;
const $turnosGuardados = document.getElementById(
  "turnosGuardados"
) as HTMLDivElement;
const $icon = document.querySelector(".iconForForm") as HTMLImageElement;

//si no le especifico el tipo de html que es, me da por defecto element | null;

$btn.addEventListener("click", function () {
  console.log("agregar nuevo turno");
  createTurno();
});

const createTurno = (): void => {
  let div: HTMLDivElement = document.createElement("div");
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

  const fecha: string = new Date().toISOString().split("T")[0];

  const hora: string = new Date().toTimeString().slice(0, 5);

  const $time = document.getElementById("time") as HTMLInputElement;
  $time.value = hora;

  const $btnAdd = div.querySelector("#add") as HTMLButtonElement;

  $btnAdd?.addEventListener("click", function () {
    saveTurno();
  });
};

type Turno = {
  clienta: string;
  hora: string;
  fecha: string;
  seccion: string;
  motivo: string;
};

let turnos: Turno[] = JSON.parse(localStorage.getItem("dataTurnos") || "[]");

function saveTurno(): void {
  const nuevoTurno: Turno = {
    fecha: (document.getElementById("date") as HTMLInputElement).value,
    hora: (document.getElementById("time") as HTMLInputElement).value,
    clienta: (document.getElementById("name") as HTMLInputElement).value,
    seccion: (document.getElementById("select") as HTMLInputElement).value,
    motivo: (document.getElementById("motive") as HTMLInputElement).value,
  };

  turnos.push(nuevoTurno);

  saveData();
  renderTurnos();

  const $formularioTurno = document.getElementById(
    "formularioTurno"
  ) as HTMLDivElement;
  $formularioTurno.remove();
}

function saveData(): void {
  localStorage.setItem("dataTurnos", JSON.stringify(turnos));
}

renderTurnos();

function renderTurnos(): void {
  turnos.length > 0
    ? (($container.style.display = "none"), ($icon.style.display = "block"))
    : (($container.style.display = "block"), ($icon.style.display = "none"));

  turnos.sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  turnos.sort(
    (a, b) => new Date(a.hora).getTime() - new Date(b.hora).getTime()
  );

  $turnosGuardados.innerHTML = "";

  turnos.forEach((turno, index) => {
    let turnoDiv: HTMLDivElement = document.createElement("div");
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

    const $delete = turnoDiv.querySelector(
      `#delete-${index}`
    ) as HTMLButtonElement;
    $delete.addEventListener("click", function () {
      deleteTurno(index);
    });
  });
}

function deleteTurno(index: number): void {
  turnos.splice(index, 1);
  saveData();
  renderTurnos();
}
