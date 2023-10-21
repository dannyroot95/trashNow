var mMicroroutes = ''
var nMicroroutes = ''
const tabla = document.getElementById('tb-data-add');
const tbody = tabla.getElementsByTagName('tbody')[0];
document.getElementById("descript").value = "Ninguno"
var numZone 
let cacheV = localStorage.getItem("zones")
let vCache = JSON.parse(cacheV)
let report = []

createDatatable()

if(vCache == null){
  document.getElementById("bgspinner").style = "display:block;"
  getZonesFromDatabase()
}else{
  getZonesFromCache()
}

getZonesFromDatabase()
getAllVehicles()
getAllMicroroutes()
getSectors()


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
      let button = '<button style="margin-left:10px;color:white;background-color:#D4AC0D;border-color:#D4AC0D;" onclick="showAddZone()" class="btn btn-info"><ion-icon name="add-circle"></ion-icon>&nbsp;Crear zona</button>'
      button = button+'&nbsp;&nbsp;<button onclick="exportToExcel()" class="btn btn-primary"><ion-icon name="print"></ion-icon>&nbsp;Reporte</button>'
      $(button).appendTo('#tb-data_length')
  }

  function getZonesFromCache(){

    report = []

    $('#tb-data').DataTable().destroy()
            $("#tbody").html(

      vCache.map((v) => {
    
          numZone++

            let sectors = ""
            let sectorsV = ""
            let microroutes = ""
            let microroutesV = ""
            let plates = ""
            let platesV = ""
            let frequency = ""
            let frequencyV = ""
            let turn = ""
            let turnV = ""
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

            
          for(let i = 0 ; i<v.sectors.length ; i++){
            let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.sectors[i]}</label></center>`
            sectors += data;
            sectorsV += v.sectors[i]+' | '
          }

            for(let i = 0 ; i<v.microroutes.length ; i++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.microroutes[i]}</label></center>`
                microroutes += data;
                microroutesV += v.microroutes[i]+' | '
            }

            for(let j = 0 ; j<v.plates.length ; j++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.plates[j]}</label></center>`
                plates += data;
                platesV += v.plates[j]+' | '
            }

            for(let k = 0 ; k<v.frequency.length ; k++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.frequency[k]}</label></center>`
                frequency += data;
                frequencyV += v.frequency[k]+' | '
            }

            for(let m = 0 ; m<v.turn.length ; m++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.turn[m]}</label></center>`
                turn += data;
                turnV += v.turn[m]+' | '
            }

            let data = {
              "Numero de zona":v.number,
              "Sectores" : sectorsV,
              "Micro-Rutas" : microroutesV,
              "Placas" : platesV,
              "Frecencia de recoleccion" : frequencyV,
              "Turno" : turnV
            }

            report.push(data)
    
                return `
                <tr style="cursor: pointer">
                <td style="color: red;font-weight: bold;font-size: 18px;"><center>${space}${v.number}</center></td>
                <td><center>${sectors}</center></td>
                <td>${microroutes}</td>
                <td>${plates}</td>
                <td>${frequency}</td>
                <td>${turn}</td>
                <td><center><button class="btn btn-danger" onclick="deleteZone('${v.id}')">Eliminar</button></center></td>
                </tr>`;
             
            })
            .join("")
        );
    
        //console.log(students)
        createDatatable()
        document.getElementById("bgspinner").style = "display:none;"             
    
}

function getZonesFromDatabase(){

  db.collection("zones").onSnapshot((querySnapshot) => {

    numZone = 0
    report = []

        zones = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          $('#tb-data').DataTable().destroy()
          $("#tbody").html(

      zones.map((v) => {
  
        numZone++

          let sectors = ""
          let sectorsV = ""
          let microroutes = ""
          let microroutesV = ""
          let plates = ""
          let platesV = ""
          let frequency = ""
          let frequencyV = ""
          let turn = ""
          let turnV = ""
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

          for(let i = 0 ; i<v.sectors.length ; i++){
            let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.sectors[i]}</label></center>`
            sectors += data;
            sectorsV += v.sectors[i]+' | '
          }

            for(let i = 0 ; i<v.microroutes.length ; i++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.microroutes[i]}</label></center>`
                microroutes += data;
                microroutesV += v.microroutes[i]+' | '
            }

            for(let j = 0 ; j<v.plates.length ; j++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.plates[j]}</label></center>`
                plates += data;
                platesV += v.plates[j]+' | '
            }

            for(let k = 0 ; k<v.frequency.length ; k++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.frequency[k]}</label></center>`
                frequency += data;
                frequencyV += v.frequency[k]+' | '
            }

            for(let m = 0 ; m<v.turn.length ; m++){
                let data = `<center><label style="border: 1px solid #145A32;width: 100%;">${v.turn[m]}</label></center>`
                turn += data;
                turnV += v.turn[m]+' | '
            }

            let data = {
              "Numero de zona":v.number,
              "Sectores" : sectorsV,
              "Micro-Rutas" : microroutesV,
              "Placas" : platesV,
              "Frecencia de recoleccion" : frequencyV,
              "Turno" : turnV
            }

            report.push(data)
  
              return `
              <tr style="cursor: pointer">
              <td style="color: red;font-weight: bold;font-size: 18px;"><center>${space}${v.number}</center></td>
              <td><center>${sectors}</center></td>
              <td>${microroutes}</td>
              <td>${plates}</td>
              <td>${frequency}</td>
              <td>${turn}</td>
              <td><center><button class="btn btn-danger" onclick="deleteZone('${v.id}')">Eliminar</button></center></td>
              </tr>`;
           
          })
          .join("")
      );
  
      //console.log(students)
      createDatatable()
      localStorage.setItem("zones",JSON.stringify(zones))
      document.getElementById("bgspinner").style = "display:none;"     
             
    }, (error) => {
      console.log(error)
  }); 
}

function selectTurn() {
    let dTurn = document.getElementById("selectMicroRoute")
    var turn = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    if(turn == "MAÑANA"){
        dTurn.innerHTML = mMicroroutes
    }else{
        dTurn.innerHTML = nMicroroutes
    }
  }

function deleteZone(id){
  db.collection("zones").doc(id).delete()
  Swal.fire(
    'Muy bien!',
    'La zona ha sido eliminada!',
    'success'
  )
}  


  function getAllMicroroutes(){

    
    let mr = document.getElementById("selectMicroRoute")

    db.collection("microroutes").get().then((snaphot) =>{
        
        snaphot.forEach(e => {
            let turn = e.data().turn
            if(turn == "M"){
                mMicroroutes += `<option value="${e.data().name}">${e.data().name}</option>`
            }else if(turn == "N"){
                nMicroroutes += `<option value="${e.data().name}">${e.data().name}</option>`
            }
        })

        mr.innerHTML = mMicroroutes

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
    const microroute = document.getElementById("selectMicroRoute").value
    const plate = document.getElementById("selectVehicles").value
    const descripcion = document.getElementById("descript").value
    const selectedDataSector = getSelectedData()
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
            
      if(days != "" && turn != "" && selectedDataSector != ""){
        addData(days,turn,plate,microroute,descripcion,selectedDataSector)
      }else{
        Swal.fire(
          'Oops!',
          'Complete los campos!',
          'info'
        )
      }      
  }

  function addData(days,turn,plate,mr,descripcion,sectors){
  
  const datosInicial = {
    microruta: mr,
    placa: plate,
    dias: days,
    turno: turn,
    descripcion: descripcion,
    sectors:sectors
  };

  agregarRegistro(datosInicial);

  }

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

  function agregarRegistro(datos) {
    // Crear una nueva fila

    if (microrutaExistente(datos.microruta)) {
        Swal.fire(
          'Oops!',
          'La microruta ya existe en la tabla!',
          'info'
        )
      }else{

        const nuevaFila = document.createElement('tr');

        // Crear las celdas y asignar los valores
        const numeroCelda = document.createElement('td');
        numeroCelda.textContent = tbody.rows.length + 1;

        const sectorCelda = document.createElement('td');
        sectorCelda.textContent = datos.sectors;
    
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
        nuevaFila.appendChild(sectorCelda);
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

  function saveZone(){
      // Obtener la referencia a la tabla
  var table = document.getElementById("tb-data-add");

  // Crear los arrays para almacenar los datos
  var sectors = [];
  var frequency = [];
  var microroutes = [];
  var plates = [];
  var turn = [];

  // Obtener las filas de la tabla (excluyendo la fila de encabezado)
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  // Recorrer las filas de la tabla
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    // Obtener los valores de las celdas y agregarlos a los arrays correspondientes
    sectors.push(cells[1].textContent);
    microroutes.push(cells[2].textContent);
    plates.push(cells[3].textContent);
    frequency.push(cells[4].textContent);
    turn.push(cells[5].textContent);
  }


  let data = {
    sectors:sectors,
    frequency:frequency,
    microroutes:microroutes,
    plates:plates,
    turn:turn,
    number:numZone+1
  }

  if(frequency.length != 0){
    db.collection("zones").add(data).then(function(docRef) {
      db.collection("zones").doc(docRef.id).update({id:docRef.id})
  })
  
  Swal.fire(
    'Muy bien!',
    'Se ha creado la zona!',
    'success'
  )
  clean()
  
  $('#addZone').modal('hide')
  }else{
    Swal.fire(
      'Oops!',
      'Complete los campos!',
      'info'
    )
  }
}

function getSectors() {
  const divTag = document.getElementById('divTag');

  db.collection("sectors").get().then((snapshot) => {
    snapshot.forEach(e => {
      let tag = e.data().label;

      // Crear un elemento de div para el checkbox
      const checkboxDiv = document.createElement('div');
      checkboxDiv.classList.add('form-check');

      // Crear el elemento del checkbox
      const checkboxInput = document.createElement('input');
      checkboxInput.classList.add('form-check-input');
      checkboxInput.type = 'checkbox';
      checkboxInput.value = tag;
      checkboxInput.id = `checkbox_${tag}`;

      // Crear la etiqueta (label) para el checkbox
      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.htmlFor = `checkbox_${tag}`;
      label.appendChild(document.createTextNode(tag));

      // Agregar el checkbox y su etiqueta al divTag
      checkboxDiv.appendChild(checkboxInput);
      checkboxDiv.appendChild(label);

      divTag.appendChild(checkboxDiv);
    });
  });
}

function getSelectedData() {
  const selectedCheckboxes = document.querySelectorAll('#divTag .form-check-input:checked');
  const selectedDataArray = [];

  selectedCheckboxes.forEach(checkbox => {
    selectedDataArray.push(checkbox.value);
  });

  // Convierte el array en un string separado por comas
  const selectedDataString = selectedDataArray.join(',');

  return selectedDataString;
}

function clean(){
  document.getElementById("d1").checked = false
  document.getElementById("d2").checked = false
  document.getElementById("d3").checked = false
  document.getElementById("d4").checked = false
  document.getElementById("d5").checked = false
  document.getElementById("d6").checked = false
  document.getElementById("d7").checked = false
  document.getElementById("descript").value = ""
  document.getElementById("tbodyS").innerHTML = ""
}

function exportToExcel(){


  Swal.fire({
      title: 'En breves se descargará el archivo!',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })

  let xls = new XlsExport(report, 'reporte');
  xls.exportToXLS(`reporte_de_zonas.xls`)
}