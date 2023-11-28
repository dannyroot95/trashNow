let map;
const markers = []; // Almacena referencias a los marcadores
let polyline; // Almacena referencia a la polilínea

function inicializarMapa() {
  const mapOptions = {
    center: { lat: 0, lng: 0 }, // Coordenadas iniciales del mapa
    zoom: 15, // Nivel de zoom inicial
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  // Crea la polilínea inicialmente vacía
  polyline = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });
}

function mostrarEnMapa(latitude, longitude, iconUrl) {
  // Elimina los marcadores existentes en el mapa
  markers.forEach(marker => marker.setMap(null));

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

  // Añade la posición a la polilínea principal
  //const path = polyline.getPath();
  //path.push(location);
  //polyline.setPath(path);

  // Centra el mapa en la nueva ubicación
  map.setCenter(location);
}


// Llamar a inicializarMapa() después de definirla
inicializarMapa();

db.collection('Locations').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    if (doc.exists) {
      const data = doc.data();
      const latitude = data.l[0];
      const longitude = data.l[1];

      // Llama a la función para mostrar los datos en el mapa de Google Maps
      mostrarEnMapa(latitude, longitude, '../imgs/icon-trash-car.png');
    } else {
      console.log('No se encontraron datos para este ID.');
    }
  });
});
