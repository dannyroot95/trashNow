let map;
const markers = []; // Almacena referencias a los marcadores

function inicializarMapa() {
  const mapOptions = {
    center: { lat: 0, lng: 0 }, // Coordenadas iniciales del mapa
    zoom: 15, // Nivel de zoom inicial
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function mostrarEnMapa(latitude, longitude) {
  // Elimina los marcadores existentes en el mapa
  markers.forEach(marker => marker.setMap(null));
  markers.length = 0; // Limpia la matriz de marcadores

  const location = { lat: latitude, lng: longitude };

  const marker = new google.maps.Marker({
    position: location,
    map: map
  });

  // Agrega el nuevo marcador a la matriz
  markers.push(marker);

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

      // Llama a una función para mostrar los datos en el mapa de Google Maps
      mostrarEnMapa(latitude, longitude);
    } else {
      console.log('No se encontraron datos para este ID.');
    }
  });
});
