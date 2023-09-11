var map = L.map('map').setView([-12.58796233635086, -69.19836649854861], 14);

// Agrega una capa de mapa base (puedes usar diferentes proveedores de mapas)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crea un grupo para los polígonos dibujados
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Agrega el control de dibujo al mapa
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: true,
        circle: false,
        marker: false,
        polyline: false,
        rectangle: false
    }
});
map.addControl(drawControl);

// Maneja eventos de dibujo
map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);

    // Obtiene las coordenadas del polígono y las muestra en la consola
    var coordinates = layer.getLatLngs();
    console.log("Coordenadas del polígono:", coordinates);
});

// Agrega un evento de edición para los polígonos
map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        // Aquí puedes realizar acciones adicionales cuando se edita un polígono
    });
});


