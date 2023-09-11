createDatatable()
createDatatableStreet()
let cacheV = localStorage.getItem("microroutes")
let vCache = JSON.parse(cacheV)

if(vCache == null){
  document.getElementById("bgspinner").style = "display:block;"
  getRoutesFromDatabase()
}else{
  getRoutesFromCache()
}

var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -12.594560706767819, lng: -69.19654064464878},
  zoom: 15
});

let selector = document.getElementById("inputGroupSelectTurn"); 
var markers = [];
var positions = [];
var polyline = null;
var turnM = 0
var turnN = 0

google.maps.event.addListener(map, 'click', function(event) {
  addMarker(event.latLng);
});

selector.addEventListener("change", () => {
  // if value switched by client
    if(selector.value == "M"){
      if(turnM >= 1){
        document.getElementById("mr").value = "MRM-"+(turnM+1)
      }else{
        if(turnM == 0){
          document.getElementById("mr").value = "MRN-"+(turnM+1)
        }
      }
        
    }else{
      if(turnN >= 1){
        document.getElementById("mr").value = "MRN-"+(turnN+1)
      }else{
        if(turnN == 0){
          document.getElementById("mr").value = "MRN-"+(turnN+1)
        }
      }
    }
  });

getLastMicroRoutes()



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
    let button = `
    <button style="margin-left:10px;color:white;background-color:#004489;border-color:#004489;"
     onclick="showAddRoute()" class="btn btn-info">Crear Micro-ruta</button>
     <button style="margin-left:10px;color:white;background-color:#007619;border-color:#007619;"
     onclick="showAddStreet()" class="btn btn-info">Agregar calles</button>
     `
    $(button).appendTo('#tb-data_length')
}

function createDatatableStreet(){

  $('#tb-data-s').DataTable({
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


}

function showAddRoute(){
  $('#addRouter').modal('show')
}

function closeAddRouter(){
  $('#addRouter').modal('hide')
}

function showAddStreet(){
  $('#modalAddStreet').modal('show')
  setTimeout(function() {
    document.getElementById("th-btn").click();
  }, 500);
        
}

// Agregar un evento de clic al mapa para crear un marcador


// Función para agregar un marcador al mapa y al array de marcadores
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
  positions.push({
    lat: location.lat(),
    lng: location.lng()
  });

  console.log(positions);

  // Agregar un evento de clic al marcador para eliminarlo
  marker.addListener('click', function() {
    removeMarker(marker);
  });

  updatePolyline();

}

// Función para eliminar un marcador del mapa y del array de marcadores
function removeMarker(marker) {
  // Eliminar el marcador del mapa
  marker.setMap(null);

  // Encontrar y eliminar el marcador del array de marcadores
  for (var i = 0; i < markers.length; i++) {
    if (markers[i] === marker) {
      markers.splice(i, 1);
      break;
    }
  }

  // Encontrar y eliminar la posición del marcador del array de posiciones
  for (var j = 0; j < positions.length; j++) {
    if (positions[j].lat === marker.getPosition().lat() && positions[j].lng === marker.getPosition().lng()) {
      positions.splice(j, 1);
      break;
    }
  }
  updatePolyline();
  console.log(positions);

}

function updatePolyline() {
  // Verificar si ya existe una línea
  if (polyline !== null) {
    polyline.setMap(null);
  }

  // Crear una nueva línea
  polyline = new google.maps.Polyline({
    path: positions,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  // Agregar las posiciones de los marcadores a la línea
  polyline.setPath(positions);

  // Mostrar la línea en el mapa
  polyline.setMap(map);
}

function deleteMarkers() {
  // Eliminar todos los marcadores del mapa
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  // Vaciar el array de marcadores
  markers = [];

  // Vaciar el array de posiciones
  positions = [];

  // Eliminar la línea del mapa
  if (polyline !== null) {
    polyline.setMap(null);
    polyline = null;
  }
}

function getLastMicroRoutes(){

turnM = 0
turnN = 0

db.collection("microroutes").get().then((snapshot)=>{

 snapshot.forEach(e => {
    console.log(e.data().turn)
    if(e.data().turn == "M"){
      turnM++
    }else if(e.data().turn == "N"){
      turnN++
    }
  
  });

})


}

function create(){

  let valueMR = document.getElementById("mr").value
  let turn = document.getElementById("inputGroupSelectTurn").value
  let descript = document.getElementById("descript").value

  const coverage = document.getElementById("tb-data-s2");
  const coverageRow = coverage.querySelectorAll("tbody tr");

  const data = [];

  let hasPuntoInicial = false;
  let hasPuntoFinal = false;


  if(turn != "0"){

    if(positions.length >0){

      if(coverageRow.length > 0){

        coverageRow.forEach(fila => {
          const avenida = fila.querySelector("td.avenida").textContent;
          const descripcion = fila.querySelector("td:nth-child(3)").textContent;
          const distancia = fila.querySelector("td:nth-child(4)").textContent;
          const actividad = fila.querySelector("td:nth-child(5)").textContent;
      
          data.push({
            avenue: avenida,
            description: descripcion,
            distance: distancia,
            activity: actividad
          });
      
          if (actividad === "Punto Inicial") {
            hasPuntoInicial = true;
          }
      
          if (actividad === "Punto final") {
            hasPuntoFinal = true;
          }
        })

        if (hasPuntoInicial === true && hasPuntoFinal === true) {

        let x = {name : valueMR , turn : turn , id : "" , positions : positions , descript:descript , coverage : dataCoverage()}

        db.collection("microroutes").add(x).then(function(docRef) {
          db.collection("microroutes").doc(docRef.id).update({id:docRef.id})
      })
      
      Swal.fire(
        'Muy bien!',
        'Micro-ruta creada!',
        'success'
      )
  
      closeAddRouter()
      deleteMarkers()
      document.getElementById("mr").value = "MR"
      document.getElementById("inputGroupSelectTurn").value = "0"
      document.getElementById("descript").value = ""
      document.getElementById("tbodyStreet2").innerHTML = ""
      document.getElementById("in-description").value = ""
      document.getElementById("in-distance").innerHTML = ""
      
      getLastMicroRoutes()
    }else{
      Swal.fire(
        'Oops!',
        'Asegúrate de agregar los registros "Punto Inicial" y "Punto final" en la tabla de coberturas.',
        'info'
      )
    }

      }else{
        Swal.fire(
          'Oops!',
          'Agrege las coberturas!',
          'info'
        )
      }

    }else{
      Swal.fire(
        'Oops!',
        'Ingrese las posciciones en el mapa',
        'info'
      )
    }

  
  }else{
    Swal.fire(
      'Oops!',
      'Seleccione un turno',
      'info'
    )
  }
}

function getRoutesFromDatabase(){

  db.collection("microroutes").onSnapshot((querySnapshot) => {

    let ctx = 0

      routes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        $('#tb-data').DataTable().destroy()
        $("#tbody").html(
    routes.map((v) => {

      let des = v.descript

      if(des == ""){
        des = "Ninguno"
      }

          ctx++

            return `
            <tr style="cursor: pointer">
            <td><strong>${ctx}</strong></td>
            <td>${v.name}</td>
            <td>${v.turn}</td>
            <td>${des}</td>
            </tr>`;
         
        })
        .join("")
    );

    //console.log(students)
    createDatatable()
    localStorage.setItem("microroutes",JSON.stringify(routes))
    document.getElementById("bgspinner").style = "display:none;"
    getStreetsFromDatabase()
           
  }, (error) => {
    console.log(error)
}); 

}

function getRoutesFromCache(){

  let ctx = 0
   
    $('#tb-data').DataTable().destroy()
    $("#tbody").html(
  vCache
    .map((v) => {

      let des = v.descript

      if(des == ""){
        des = "Ninguno"
      }

      ctx++

        return `
        <tr style="cursor: pointer">
        <td><strong>${ctx}</strong></td>
        <td>${v.name}</td>
        <td>${v.turn}</td>
        <td>${des}</td>
        </tr>`;
     
    })
    .join("")
);

//console.log(students)
createDatatable()
document.getElementById("bgspinner").style = "display:none;"
getRoutesFromDatabase() 

}

function addStreet(){
  let name = document.getElementById("in-street").value

  if(name != ""){

    let x = {
      nameStreet : name.toUpperCase(),
      id:""
    }
    
    db.collection("streets").add(x).then(function(docRef) {
      db.collection("streets").doc(docRef.id).update({id:docRef.id})
  })
  
  Swal.fire(
    'Muy bien!',
    'Avenida creada!',
    'success'
  )
  document.getElementById("in-street").value = ""

  }else{
    Swal.fire(
      'Oops!',
      'Ingrese el nombre de la avenida!',
      'info'
    )
  }

}

function getStreetsFromDatabase(){

  db.collection("streets").onSnapshot((querySnapshot) => {

    let ctx = 0
    let ctx2 = 0

      st = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        $('#tb-data-s').DataTable().destroy()
        $("#tbodyStreet").html(
    st.map((v) => {
          ctx++
            return `
            <tr style="cursor: pointer">
            <td><strong><center>${ctx}</center></strong></td>
            <td><center>${v.nameStreet}</center></td>
            <td><center><button onclick="deleteStreet('${v.id}')" class="btn btn-danger">Eliminar</button></center></td>
            </tr>`;
         
        })
        .join("")
    );

    $("#inputGroupSelectStreet").html(
      st.map((v) => {

        let option = ""
        ctx2++

        option = `<option value="${v.nameStreet}">${v.nameStreet}</option>`
            return option
              
           
          })
          .join("")
      );

    createDatatableStreet()

  }, (error) => {
    console.log(error)
}); 

}


function deleteStreet(id){
  db.collection("streets").doc(id).delete()
  Swal.fire(
    'Muy bien!',
    'Avenida eliminada!',
    'success'
  )
}

function addCoverage() {
  const avenida = document.getElementById("inputGroupSelectStreet").value;
  const descripcion = document.getElementById("in-description").value;
  const distancia = document.getElementById("in-distance").value;
  let actividadSeleccionada = "";

  const actividadLabels = document.querySelectorAll('input[name="flexRadioDefault"]:checked + label');
  if (actividadLabels.length > 0) {
    actividadSeleccionada = actividadLabels[0].textContent.trim();
  }


  if (avenida === "" || distancia === "" || actividadSeleccionada === "") {
    Swal.fire(
      'Oops!',
      'Por favor, complete todos los campos!',
      'info'
    )
    return;
  }

  const tabla = document.getElementById("tbodyStreet2");

  // Verificar si la avenida ya existe en la tabla
  const avenidasEnTabla = Array.from(tabla.getElementsByTagName("td")).filter(td => td.className === "avenida").map(td => td.textContent);
  if (avenidasEnTabla.includes(avenida)) {
    Swal.fire(
      'Oops!',
      'La avenida ya existe en la tabla!',
      'info'
    )
    return;
  }

  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${tabla.rows.length + 1}</td>
    <td class="avenida">${avenida}</td>
    <td>${descripcion}</td>
    <td>${distancia}</td>
    <td>${actividadSeleccionada}</td>
    <td><center><button class="btn btn-danger" onclick="eliminarFila(this)">Eliminar</button></center></td>
  `;

  tabla.appendChild(fila);
}

function eliminarFila(btn) {
  const fila = btn.closest("tr");
  fila.remove();

  // Actualizar los números de las filas
  const filas = document.querySelectorAll("#tbodyStreet2 tr");
  filas.forEach((fila, index) => {
    fila.querySelector("td:first-child").textContent = index + 1;
  });
}

function dataCoverage(){
  const tabla = document.getElementById("tb-data-s2");
  const filas = tabla.querySelectorAll("tbody tr");
  const data = [];

  filas.forEach(fila => {
    const avenida = fila.querySelector("td.avenida").textContent;
    const descripcion = fila.querySelector("td:nth-child(3)").textContent;
    const distancia = fila.querySelector("td:nth-child(4)").textContent;
    const actividad = fila.querySelector("td:nth-child(5)").textContent;

    data.push({
      avenue: avenida,
      description: descripcion,
      distance: distancia,
      activity: actividad
    });
  });

  console.log(data)

  return data;
}