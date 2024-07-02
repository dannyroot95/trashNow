let map;
const markers = [];
let polyline;
let infowindow; // Unica instancia de InfoWindow para todos los marcadores
let polylines = []

function inicializarMapa() {
  const mapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 15,
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  const location = new google.maps.LatLng(-12.592994, -69.199417);
  map.setCenter(location);

  polyline = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });

  // Crea una única instancia de InfoWindow
  infowindow = new google.maps.InfoWindow();
}

function mostrarEnMapa(latitude, longitude, iconUrl, id) {
  const location = new google.maps.LatLng(latitude, longitude);

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: iconUrl,
      scaledSize: new google.maps.Size(60, 50),
    },
  });

  // Agrega el nuevo marcador a la matriz
  markers.push(marker);

  // Asocia el evento click al marcador para mostrar la ventana de información
  marker.addListener('click', function () {
    // Realiza una consulta a Firestore para obtener los datos del conductor
    db.collection('Drivers').doc(id).get()
      .then((driverDoc) => {
        if (driverDoc.exists) {
          const driverData = driverDoc.data();
          const name = driverData.name;
          const lastname = driverData.lastname;
          const plateNumber = driverData.plateNumber;

          // Configura el contenido del infowindow con los datos del conductor
          const contentString = `<div><strong>${name} ${lastname}</strong></div><div>Placa: ${plateNumber}</div>`;
          infowindow.setContent(contentString);

          // Abre la ventana de información en la posición del marcador
          infowindow.setPosition(location);
          infowindow.open(map);
        } else {
          console.log('No se encontraron datos para este ID de conductor.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos del conductor:', error);
      });
  });
}

inicializarMapa();

db.collection('Locations').onSnapshot((querySnapshot) => {
  // Limpiar marcadores y polilínea al inicio de la actualización
  markers.forEach(marker => marker.setMap(null));
  polyline.setPath([]);

  querySnapshot.forEach((doc) => {
    if (doc.exists) {
      const data = doc.data();
      const latitude = data.l[0];
      const longitude = data.l[1];
      const locationId = doc.id; // id del documento en la colección Locations
      mostrarEnMapa(latitude, longitude, '../imgs/icon-trash-car.png', locationId);
    } else {
      console.log('No se encontraron datos para este ID.');
    }
  });
});


function showMicroR(){
  if(polylines.length === 0){
    drawRoutes()
  }else{
    removeRoutes()
  }
}

function drawRoutes() {
  document.getElementById("labelRoute").innerHTML = "Ocultar rutas"
  document.getElementById("btnShowR").style = "background-color: rgb(0, 0, 0);margin-left:20px;"
  // Obtener los datos de Firestore y dibujar las líneas
  db.collection('microroutes').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const positions = data.positions.map(position => ({
        lat: position.lat,
        lng: position.lng
      }));

      const routePath = new google.maps.Polyline({
        path: positions,
        geodesic: true,
        strokeColor: data.color || '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      // Añadir la polyline al mapa y al array de polylines
      routePath.setMap(map);
      polylines.push(routePath);
    });
  });
}

function removeRoutes() {
  document.getElementById("labelRoute").innerHTML = "Ver rutas"
  document.getElementById("btnShowR").style = "background-color: rgb(53, 3, 94);margin-left:20px;"
  // Eliminar cada polyline del mapa y vaciar el array de polylines
  polylines.forEach((polyline) => {
    polyline.setMap(null);
  });
  polylines = []; // Vaciar el array
}