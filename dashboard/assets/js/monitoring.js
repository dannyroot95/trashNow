let map;
const markers = []; // Almacena referencias a los marcadores

function inicializarMapa() {
  const mapOptions = {
    center: { lat: 0, lng: 0 }, // Coordenadas iniciales del mapa
    zoom: 15, // Nivel de zoom inicial
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function mostrarEnMapa(latitude, longitude, iconUrl) {
  // Elimina los marcadores existentes en el mapa
  markers.forEach(marker => marker.setMap(null));
  markers.length = 0; // Limpia la matriz de marcadores

  const location = { lat: latitude, lng: longitude };

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: iconUrl, // Establece la URL de la imagen del marcador personalizado
      scaledSize: new google.maps.Size(60, 50), // Ajusta el tamaño del marcador (en este caso, 20x20 píxeles)
    },
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

      // Llama a la función para mostrar los datos en el mapa de Google Maps
      mostrarEnMapa(latitude, longitude, '../imgs/icon-trash-car.png');
    } else {
      console.log('No se encontraron datos para este ID.');
    }
  });
});




