let listaAsignaturas=[];
let listaCursos=[];

const cargarAsignaturas= async()=>{
   
  try{
      listaAsignaturas.length=0;
      const respuesta=await fetch('http://localhost:3000/asignaturas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Asignaturas. Estado: ',respuesta.status);
      }
      const Asignaturas=await respuesta.json();
      listaAsignaturas.push(...Asignaturas);

  }catch(error){
      console.error("Error al cargar Asignaturas",error.message);
  }

  console.log(listaAsignaturas)
}

const cargarCursos= async()=>{

    try{
        listaCursos.length=0;
        const respuesta=await fetch('http://localhost:3000/cursos');
  
        if(!respuesta.ok){
           throw new Error('Error al cargar Cursos. Estado: ',respuesta.status);
        }
        const Cursos=await respuesta.json();
        listaCursos.push(...Cursos);
  
    }catch(error){
        console.error("Error al cargar Cursos",error.message);
    }
  
    console.log(listaCursos)
}

const cargarFormularioAsignaturas= async()=>{
    await cargarCursos();
    const AsignaturasForm = document.getElementById('Asignaturas-form');
    AsignaturasForm.innerHTML = `<h2>Crear Asignaturas</h2>
      <form>
          <label for="CursoAsignatura">Seleccione el Curso:</label>
          <div class="search-container.cursoasign">
            <input type="text" id="search-input-cursoasign" placeholder="Buscar Cursos...">
            <ul id="search-results-cursoasign"></ul>
          </div>
          <label for="codigoASIGN">Codigo de Asignatura:</label>
          <input type="text" id="codigoASIGN" required>
          <label for="cantcreditosasign">Ingrese cantidad de Creditos:</label>
          <input type="number" id="cantcreditosasign" required>
          <label for="DocenteAsign">Seleccione Al Docente Encargado:</label>
          <div class="search-container.DocenteAsign">
            <input type="text" id="search-input-DocenteAsign" placeholder="Buscar Docentes...">
            <ul id="search-results-DocenteAsign"></ul>
          </div>
          <label for="cuposAsign">Max de Cupos Disponibles:</label>
          <input type="number" id="cuposAsign" required> 
          <label for="ProgramaAsign">Seleccione un Programa:</label>
          <div class="search-container.ProgramaAsign">
            <input type="text" id="search-input-ProgramaAsign" placeholder="Buscar Programas...">
            <ul id="search-results-ProgramaAsign"></ul>
          </div>
          <div id="horarios">
          <label for="HorarioAsign">Seleccione un Horario:</label>
            <div id="horarios">
              <label for="dia-1">Día:</label>
              <select class="HorarioDia" required>
                ${cargardias()}
              </select>
              <label for="hora-1">Horario:</label>
              <select class="HorarioHoras" required>
                ${cargarHorarios()}
              </select>
              <label for="salon-1">Salón:</label>
              <select class="HorarioSalon" required>
                ${selectSalones()}
              </select>
            </div>
          </div>

          <button type="button" id="agregarHorario">Agregar otro horario</button>
          <label for="HorarioAsign">Seleccione un Horario:</label>
            <select id="HorarioAsign" required>
            </select>
          <button type="button" onclick="crearAsignatura()">Crear Docente</button>
          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
      </form>

      
  `;

  const horariosContainer = document.getElementById('horarios');
  const agregarHorarioBtn = document.getElementById('agregarHorario');
  let horarioCount = 1;

  agregarHorarioBtn.addEventListener('click', function () {
      horarioCount++;

      const nuevoHorario = document.createElement('div');
      nuevoHorario.classList.add('horario');
      nuevoHorario.innerHTML = `
          <label for="dia-${horarioCount}">Día:</label>
          <select name="dia[]" id="dia-${horarioCount}" required>
          ${cargardias()}
          </select>
          <label for="hora-${horarioCount}">Horario:</label>
          <select name="hora[]" id="hora-${horarioCount}" required>
          ${cargarHorarios()}
          </select>
          <label for="salon-${horarioCount}">Salón:</label>
          <select name="salon[]" id="salon-${horarioCount}" required>
          ${selectSalones()}
          </select>
      `;

      horariosContainer.appendChild(nuevoHorario);
  });

  buscadorDocentes('search-input-DocenteAsign', 'search-results-DocenteAsign')
  buscadorCursos('search-input-cursoasign', 'search-results-cursoasign')
  buscadorProgramas('search-input-ProgramaAsign', 'search-results-ProgramaAsign')
}



