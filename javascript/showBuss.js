window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.toString().split('=')[1]

  requestApi(id)
};

function allDataMap(data) {
  $('#container-map').append('<h2>Mapa</h2><div id="map" class="map"></div>');

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([data.buss_stops[0].longitude, data.buss_stops[0].latitude]),
      zoom: 15
    })
  });

  data && data.buss_stops.map((value) => add_map_point(value.latitude, value.longitude, map))
}

function requestApi(id) {
  $.ajax({
    url: `http://localhost:3333/routes/${id}`,
    type: 'GET',
  })
  .then(function(res) {
    showBuss(res)
    allDataMap(res)
  })
  .catch(function(err) {                
    console.log(err)
  });
}

function add_map_point(lat, lng, map) {
  var vectorLayer = new ol.layer.Vector({
    source:new ol.source.Vector({
      features: [new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
      })]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
      })
    })
  });
  map.addLayer(vectorLayer); 
}

function showBuss (data) {
  $('#buss-data').append(`<h3 class="mb-20">Marca: ${data.buss.brand}</h3><h3 class="mb-20">Modelo: ${data.buss.model}</h3><h3>Placa: ${data.buss.plate}</h3>`)
  data.buss_stops.length === 0 ? 
    $('#show-buss').append("<h1 style='text-align: center'>Nenhuma rota foi encontrado</h1>") :  
      data.buss_stops.map((value) => {
        $('#show-buss').append(`<div class='table-row mb-20' onclick='showMap(${value.latitude},${value.longitude})'><p>${value.id}</p><p>${value.street_name}</p><p>${value.latitude}</p><p>${value.longitude}</p></div>`)
  })
}
