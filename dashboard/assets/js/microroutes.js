createDatatable()
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
    let button = '<button style="margin-left:10px;color:white;background-color:#004489;border-color:#004489;" onclick="showAddRoute()" class="btn btn-info">Crear Micro-ruta</button>'
    $(button).appendTo('#tb-data_length')
}

function showAddRoute(){
  $('#addRouter').modal('show')
}

function closeAddRouter(){
  $('#addRouter').modal('hide')
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

  if(turn != "0"){

    if(positions.length >0){

      let x = {name : valueMR , turn : turn , id : "" , positions : positions , descript:descript}

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
    
    getLastMicroRoutes()

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