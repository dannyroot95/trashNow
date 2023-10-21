var map; // Global declaration of the map
var drawingManager
var shapes = []  
var vertices = ""
var idDeleteArea = ""
var point = {}

//createDatatable()

function createDatatable(){

  $('#tb-data-sector').DataTable({
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

    var table = $('#tb-data-sector').DataTable();
    $('#container').css( 'display', 'block' );
    table.columns.adjust().draw();
}

function showArea(){
  MicroModal.show("modal-area")
}

function showReference(){
  MicroModal.show("reference-area")
}

function deleteArea(){
  document.getElementById("shapes").innerHTML = ''
  MicroModal.show("delete-area")
  db.collection("sectors").get().then(snapshot =>{
    var ctx = 0
    var area = '<option value="'+0+'">Seleccione un área...</option>'
    $(area).appendTo('#shapes');
    snapshot.forEach(document =>{
      ctx++
      var area = '<option value="'+ctx+'">'+document.data().label+'</option>'
      $(area).appendTo('#shapes');
    })
  })
}

function initializeReference() {
  // Configuración del mapa

  var latitude 
  var longitude

  var reference = JSON.parse(localStorage.getItem("reference"));
  if (reference != null && reference != "" && reference != undefined) {

    latitude = reference.lat
    longitude = reference.lng

  }else{
     latitude = -12.5746489620646
     longitude = -69.16789782379598
  }


  var mapProp = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // Agregando el mapa al tag de id googleMap
  var map = new google.maps.Map(document.getElementById("googleMapReference"), mapProp);
  
  // Creando un marker en el mapa
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    title: 'Mi poscición',
    draggable: true //que el marcador se pueda arrastrar
  });
 
  // Registrando el evento drag, en este caso imprime 
  // en consola la latitud y longitud
  google.maps.event.addListener(marker,'drag',function(event) {
    point = {lat:event.latLng.lat(),lng:event.latLng.lng(),zoom:17}
  });
}

function saveReference(){
   if(Object.entries(point).length != 0){

    document.getElementById("footerReference").style = "display:none;"
    document.getElementById("save_reference").style = "display:block;"

    db.collection("reference").doc("point").set(point).then(response =>{

      localStorage.setItem("reference", JSON.stringify(point));
      document.getElementById("footerReference").style = "display: flex; justify-content: space-around;margin-top: -20px;"
      document.getElementById("save_reference").style = "display:none;"
      MicroModal.close("reference-area")
      closeReference()

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          location.reload()
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Ubicación guardada!'
      })
      
    })
      
   }else{
    Swal.fire(
      'Hey!',
      'Agregue un punto de referencia!',
      'info'
    )
   }
}

function closeReference(){
  point = {}
}

function initialize() {

  var myLatlng 
  var reference = JSON.parse(localStorage.getItem("reference"));

  if (reference != null && reference != "" && reference != undefined) {

    myLatlng = new google.maps.LatLng(reference.lat, reference.lng);

  }else{
      myLatlng = new google.maps.LatLng(-12.5746489620646, -69.16789782379598);
  }
  
 
  var myOptions = {
    zoom: 16,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      editable: true
    }
  });
  drawingManager.setMap(map);


 
google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
    overlayClickListener(event.overlay);
    vertices = event.overlay.getPath().getArray().toString()
    drawingManager.setMap(null)    
  });
}


function overlayClickListener(overlay) {
  google.maps.event.addListener(overlay, "mouseout", function(event) {
    shapes = []
    vertices = ""
    vertices = overlay.getPath().getArray().toString()
  });
}


  
  function deleteMarkers() {
    shapes = []
    vertices = ""

    var myLatlng 
    var reference = JSON.parse(localStorage.getItem("reference"));
  
    if (reference != null && reference != "" && reference != undefined) {
  
      myLatlng = new google.maps.LatLng(reference.lat, reference.lng);
  
    }else{
        myLatlng = new google.maps.LatLng(-12.5746489620646, -69.16789782379598);
    }
    var myOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      drawingManager.setMap(map);
      vertices = ""
      init()
      document.getElementById("label").value = ""
  }

 

  function saveArea(){ 

    var label = document.getElementById("label").value

    if(vertices != ""){

      if(label != ""){

        var splitter = vertices.split(")")

    
      for(var i = 0 ; i<splitter.length; i++){
  
        var v1 = splitter[i].replaceAll("(","")
        
  
        if(i > 0 ){
          var v2 = v1.replaceAll(" ","")
          var del = v2.slice(1, -1)
          var v3= del.split(",")
          var lat = parseFloat(v3[0])
          var lgn = parseFloat(v3[1])
          shapes.push({lat:lat,lng:lgn})
        }else{
          var v2 = v1.replaceAll(" ","")
          var v3= v2.split(",")
          var lat = parseFloat(v3[0])
          var lgn = parseFloat(v3[1])
          shapes.push({lat:lat,lng:lgn})
        }
        
      }
  
      shapes.pop()
      saveToDatabase(shapes,label)

      }else{

        Swal.fire(
          'Hey!',
          'Ingrese una etiqueta al sector!',
          'warning'
        )

      }
      
    }else{

      Swal.fire(
        'Hey!',
        'Agregue un sector!',
        'warning'
      )

    }
 
  }

function init() {

  let ctx = 0

  var infowindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 50)
  });

  db.collection("sectors").get().then(snapshot =>{

    var latitude 
    var longitude
  
    var reference = JSON.parse(localStorage.getItem("reference"));
    if (reference != null && reference != "" && reference != undefined) {
  
      latitude = reference.lat
      longitude = reference.lng
  
    }else{
       latitude = -12.5746489620646
       longitude = -69.16789782379598
    }

    const map = new google.maps.Map(document.getElementById("mapa"), {
      zoom: 15,
      center: { lat: latitude, lng: longitude },
      mapTypeId: "terrain",
    });

    snapshot.forEach(query => {

      ctx++
      // Construct the polygon.
      const polygon = new google.maps.Polygon({
        paths: query.data().shapes,
        strokeColor: query.data().color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: query.data().color,
        fillOpacity: 0.35,
      });

        // Agregar una fila a la tabla
        const tableBody = document.getElementById("tbodySector");
        const newRow = tableBody.insertRow();

        // Añadir celdas a la fila
        const cell1 = newRow.insertCell(0);
        cell1.innerHTML = `<center><strong>${ctx}</strong></center>`;
        const cell2 = newRow.insertCell(1);
        cell2.innerHTML = `<center>${(query.data().label).toString().toUpperCase()}</center>`;
        const cell3 = newRow.insertCell(2);
        cell3.style.backgroundColor = query.data().color; // Establecer el color de fondo de la celda


      google.maps.event.addListener(polygon, "mouseover", function(event) {   
        infowindow.setContent("<br><b>"+query.data().label+"</b><br>");
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
      });
    
      polygon.setMap(map);
          
    });
  })
}

$("#shapes").on("change", function () {
  var select = document.getElementById('shapes');
  var value = select.options[select.selectedIndex].text;
  areaDelete = value
  selectArea(value)
});

function selectArea(label) {
  
  db.collection("sectors").where("label", "==", label).get().then(snapshot =>{

    var latitude 
    var longitude
  
    var reference = JSON.parse(localStorage.getItem("reference"));
    if (reference != null && reference != "" && reference != undefined) {
  
      latitude = reference.lat
      longitude = reference.lng
  
    }else{
      latitude = -12.5746489620646
      longitude = -69.16789782379598
    }

    const map = new google.maps.Map(document.getElementById("map-canvas-2"), {
      zoom: 16,
      center: { lat: latitude, lng: longitude},
      mapTypeId: "terrain",
    });

    snapshot.forEach(query => {

      // Construct the polygon.
      const polygon = new google.maps.Polygon({
        paths: query.data().shapes,
        strokeColor: "#5bbd00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#5bbd00",
        fillOpacity: 0.35,
      });

      idDeleteArea = query.id

      polygon.setMap(map);

    })

  })
}

function deleteAreaFromDB(){

document.getElementById("deleteFooter").style = "display:none;"
document.getElementById("deleteArea").style = "display:block;"

 db.collection("sectors").doc(idDeleteArea).delete().then(() =>{
  idDeleteArea = ""
  MicroModal.close("delete-area")

  init()
 
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Sector eliminado!'
  })

  document.getElementById("deleteArea").style = "display:none;"
  document.getElementById("deleteFooter").style = "display: flex; justify-content: space-around;margin-top: -20px;"  

  google.maps.event.addDomListener(window, 'load', selectArea(null));

 }).catch((error) => {
  console.error("Error : ", error);
});

}

function saveToDatabase(shapes,label){

  document.getElementById("areaFooter").style = "display:none;"
  document.getElementById("savingArea").style = "display:block;"
  let colorPicker = document.getElementById('colorPicker').value;

  db.collection("sectors").add({shapes,label:label,color:colorPicker.toString()}).then(snap =>{

    MicroModal.close("modal-area")
    document.getElementById("label").value = ""

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Sector registrado!'
      })

    document.getElementById("savingArea").style = "display:none;"
    document.getElementById("areaFooter").style = "display: flex; justify-content: space-around;margin-top: -20px;"  

    deleteMarkers()
  })
}

function cancelDeleteArea(){
  google.maps.event.addDomListener(window, 'load', selectArea(null));
}

function cancelAddArea(){
  document.getElementById("label").value = "" 
}


function printSector(){

  Swal.fire({
    title: 'En breves se descargará el archivo!',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
  })

  var mapElement = document.getElementById("mapa");

  html2canvas(mapElement, {
    useCORS: true, // Permite CORS para la captura
  }).then(canvas => {
    html2canvas(document.querySelector("#tb-data-sector")).then(canvas2 => {
    //document.body.appendChild(canvas)
    var pdf = new jspdf.jsPDF()
  
    pdf.setFontSize(18)
    pdf.text(30, 16, "TrashCar Location System Monitoring")
    pdf.setFontSize(9)
    pdf.text(30, 22,'Mapa de sectores')
    pdf.setFontSize(12)
    pdf.addImage('../imgs/car-logo.png', 'PNG', 4, 7, 22, 22)
  
    pdf.addImage(canvas, 'JPEG', 0, 32, 220, 130);
    pdf.addImage(canvas2, 'JPEG', 0, 160, 210, 13);
    pdf.save('mapa_de_sectores.pdf')
  
    });
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'load', selectArea(null));
google.maps.event.addDomListener(window, 'load', initializeReference);