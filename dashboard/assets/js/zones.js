var mMicroroutes = ''
var nMicroroutes = ''

createDatatable()
getZonesFromDatabase()
getAllVehicles()
getAllMicroroutes()

function showAddZone(){
    $('#addZone').modal('show')
  }
  
  function closeAddZone(){
    $('#addZone').modal('hide')
  }

  function createDatatable(){

    $('#tb-data').DataTable({
        language: {
              "decimal": "",
              "emptyTable": "No hay información",
              "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
              "infoEmpty": "<b>Mostrando 0 to 0 of 0 datos</b>",
              "infoFiltered": "(Filtrado de _MAX_ total datos)",
              "infoPostFix": "",
              "thousands": ",",
              "lengthMenu": "Mostrar _MENU_ datos",
              "loadingRecords": "Cargando...",
              "processing": "Procesando...",
              "search": "Buscar en la lista: ",
              "zeroRecords": "Sin resultados encontrados",
              "paginate": {
                  "first": "Primero",
                  "last": "Ultimo",
                  "next": "Siguiente",
                  "previous": "Anterior"
              }
       },scrollY: '50vh',scrollX: true, sScrollXInner: "100%",
       scrollCollapse: true,
      });
  
      var table = $('#tb-data').DataTable();
      $('#container').css( 'display', 'block' );
      table.columns.adjust().draw();
      document.getElementById("tb-data_filter").style = "margin-bottom:10px;"
      document.getElementById("tb-data_length").style = "margin-bottom:10px;"
      let button = '<button style="margin-left:10px;color:white;background-color:#D4AC0D;border-color:#D4AC0D;" onclick="showAddZone()" class="btn btn-info">Crear zona</button>'
      $(button).appendTo('#tb-data_length')
  }

  function getZonesFromDatabase(){

    db.collection("zones").onSnapshot((querySnapshot) => {

        let ctx = 0
    
          zones = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            $('#tb-data').DataTable().destroy()
            $("#tbody").html(

        zones.map((v) => {
    
            let microroutes = ""
            let plates = ""
            let frecuency = ""
            let turn = ""
            let space = ""

            if(v.microroutes.length == 1){
                space=""
            }else if(v.microroutes.length == 2){
                space="<p></p>"
            }else if(v.microroutes.length == 3 && v.microroutes.length <5){
                space="<br>"
            }else if(v.microroutes.length >= 5){
                space="<br><br>"
            }

            for(let i = 0 ; i<v.microroutes.length ; i++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.microroutes[i]}</label></center>`
                microroutes += data;
            }

            for(let j = 0 ; j<v.plates.length ; j++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.plates[j]}</label></center>`
                plates += data;
            }

            for(let k = 0 ; k<v.frecuency.length ; k++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.frecuency[k]}</label></center>`
                frecuency += data;
            }

            for(let m = 0 ; m<v.turn.length ; m++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.turn[m]}</label></center>`
                turn += data;
            }
    
                return `
                <tr style="cursor: pointer">
                <td style="color: red;font-weight: bold;font-size: 18px;"><center>${space}${v.number}</center></td>
                <td>${microroutes}</td>
                <td>${plates}</td>
                <td>${frecuency}</td>
                <td>${turn}</td>
                </tr>`;
             
            })
            .join("")
        );
    
        //console.log(students)
        createDatatable()
               
      }, (error) => {
        console.log(error)
    }); 
}

function selectTurn() {
    let dTurn = document.getElementById("selectTurn")
    var turn = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    if(turn == "MAÑANA"){
        dTurn.innerHTML = mMicroroutes
    }else{
        dTurn.innerHTML = nMicroroutes
    }


  }


  function getAllMicroroutes(){

    
    let mr = document.getElementById("selectMicroRoute")

    db.collection("microroutes").get().then((snaphot) =>{
        
        snaphot.forEach(e => {
            let turn = e.data().turn
            if(turn == "M"){
                mMicroroutes += `<option value="${e.data().name}">${e.data().name}</option>`
            }else{
                nMicroroutes += `<option value="${e.data().name}">${e.data().name}</option>`
            }
        })

        mr.innerHTML = nMicroroutes

    })
  }

  function getAllVehicles(){

    let vehicles = document.getElementById("selectVehicles")

    db.collection("vehicles").get().then((snaphot) =>{

        let data = ""

        snaphot.forEach(e => {
            data += `<option value="${e.data().placa}">${e.data().placa}</option>`
        });

        vehicles.innerHTML = data


    })
  }

  function addToTable(){
    const checkboxes = document.querySelectorAll('.x');
    const radio = document.querySelectorAll('.y');
    let days = ""
    let turn = ""
  
    checkboxes.forEach(function(checkbox, index) {
        if (checkbox.checked) {
            const diaMarcado = checkbox.nextElementSibling.textContent.trim();
            days += diaMarcado;
        
            if (index < checkboxes.length - 1) {
              days += ', ';
            }
          }
        });
        
        // Eliminar la coma final si solo se seleccionaron dos días
        if (days.endsWith(', ')) {
          days = days.slice(0, -2);
        }

        radio.forEach(function(radio) {
            if (radio.checked) {
                const turnoMarcado = radio.nextElementSibling.textContent.trim();
                turn += turnoMarcado;
            
              }
            });
            
            addData()
        alert(days+" "+turn);
    
  }

  function addData(){
    const tabla = document.getElementById('tb-data-add');
  const tbody = tabla.getElementsByTagName('tbody')[0];

  // Función para reenumerar los registros en la tabla
  function reenumerarRegistros() {
    const filas = tbody.rows;
    for (let i = 0; i < filas.length; i++) {
      filas[i].cells[0].textContent = i + 1;
    }
  }

  // Función para eliminar una fila de la tabla
  function eliminarFila(fila) {
    tbody.removeChild(fila);
    reenumerarRegistros();
  }

  function microrutaExistente(microruta) {
    const filas = tbody.getElementsByTagName('tr');
    for (let i = 0; i < filas.length; i++) {
      const microrutaCelda = filas[i].getElementsByTagName('td')[1];
      if (microrutaCelda.textContent === microruta) {
        return true; // La microruta ya existe en la tabla
      }
    }
    return false; // La microruta no existe en la tabla
  }

  // Función para crear una nueva fila con los datos
  function agregarRegistro(datos) {
    // Crear una nueva fila

    if (microrutaExistente(datos.microruta)) {
        alert('La microruta ya existe en la tabla.');
      }else{

        const nuevaFila = document.createElement('tr');

        // Crear las celdas y asignar los valores
        const numeroCelda = document.createElement('td');
        numeroCelda.textContent = tbody.rows.length + 1;
    
        const microrutaCelda = document.createElement('td');
        microrutaCelda.textContent = datos.microruta;
    
        const placaCelda = document.createElement('td');
        placaCelda.textContent = datos.placa;
    
        const diasCelda = document.createElement('td');
        diasCelda.textContent = datos.dias;
    
        const turnoCelda = document.createElement('td');
        turnoCelda.textContent = datos.turno;
    
        const descripcionCelda = document.createElement('td');
        descripcionCelda.textContent = datos.descripcion;
    
        const accionesCelda = document.createElement('td');
    
        // Crear el botón de eliminar
        const eliminarBtn = document.createElement('button');
        eliminarBtn.classList.add('btn', 'btn-danger');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', function() {
          eliminarFila(nuevaFila);
        });
    
        // Añadir el botón de eliminar a la celda de acciones
        accionesCelda.appendChild(eliminarBtn);
    
        // Añadir las celdas a la fila
        nuevaFila.appendChild(numeroCelda);
        nuevaFila.appendChild(microrutaCelda);
        nuevaFila.appendChild(placaCelda);
        nuevaFila.appendChild(diasCelda);
        nuevaFila.appendChild(turnoCelda);
        nuevaFila.appendChild(descripcionCelda);
        nuevaFila.appendChild(accionesCelda);
    
        // Añadir la fila al cuerpo de la tabla
        tbody.appendChild(nuevaFila);
        
      }


  }

  // Ejemplo de uso

  // Agregar un registro inicial
  const datosInicial = {
    microruta: 'MNM-01',
    placa: 'fx-001',
    dias: 'lunes, martes',
    turno: 'mañana',
    descripcion: 'ninguno'
  };
  agregarRegistro(datosInicial);

  }