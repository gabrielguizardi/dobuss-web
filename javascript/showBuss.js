window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.toString().split('=')[1]

  showBuss ()
  allDataMap() 
};

var data =  [
  {
    id: 1,
    buss_id: 1,
    created_at: "2021-11-22 20:30:46",
    updated_at: "2021-11-22 20:30:46",
    buss: {
      id: 1,
      model: "1001 - R KING",
      brand: "Mercedes",
      plate: "RKNG 1001",
      created_at: "2021-11-22 20:13:51",
      updated_at: "2021-11-22 20:13:51"
    },
    buss_stops: [
      {
        id: 1,
        street_name: "Av. Brasil",
        latitude: "-22.2159188",
        longitude: "-49.9491477",
        created_at: "2021-11-22 20:18:06",
        updated_at: "2021-11-22 20:18:06",
        pivot: {
          buss_stop_id: 1,
          route_id: 1
        }
      },
      {
        id: 4,
        street_name: "Mato Grosso, 1-41",
        latitude: "-22.2134232",
        longitude: "-49.9495087",
        created_at: "2021-11-22 20:21:06",
        updated_at: "2021-11-22 20:21:06",
        pivot: {
          buss_stop_id: 4,
          route_id: 1
        }
      },
      {
        id: 5,
        street_name: "Castro Alves, 112-210",
        latitude: "-22.2078609",
        longitude: "-49.9542026",
        created_at: "2021-11-22 20:23:59",
        updated_at: "2021-11-22 20:23:59",
        pivot: {
          buss_stop_id: 5,
          route_id: 1
        }
      },
      {
        id: 6,
        street_name: "Dezesseis de Setembro, 116-140",
        latitude: "-22.1931218",
        longitude: "-49.9584462",
        created_at: "2021-11-22 20:25:57",
        updated_at: "2021-11-22 20:25:57",
        pivot: {
          buss_stop_id: 6,
          route_id: 1
        }
      },
      {
        id: 7,
        street_name: "Quitéria Pereira, 527",
        latitude: "22.183016",
        longitude: "-49.9546885",
        created_at: "2021-11-22 20:30:22",
        updated_at: "2021-11-22 20:30:22",
        pivot: {
          buss_stop_id: 7,
          route_id: 1
        }
      }
    ]
  }
]


function allDataMap() {
  console.log(data[0].buss_stops[0])

  $('#container-map').append('<h2>Mapa</h2><div id="map" class="map"></div>');

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([data[0].buss_stops[0].longitude, data[0].buss_stops[0].latitude]),
      zoom: 15
    })
  });

  data && data[0].buss_stops.map((value) => add_map_point(value.latitude, value.longitude, map))

  //add_map_point('10.781237', '-23.12312', map)
}

function showMap(lat, long) {

  // $('#container-map').append('<h2>My Map</h2><div id="map" class="map"></div>');

  // var map = new ol.Map({
  //   target: 'map',
  //   layers: [
  //     new ol.layer.Tile({
  //       source: new ol.source.OSM()
  //     })
  //   ],
  //   view: new ol.View({
  //     center: ol.proj.fromLonLat([long, lat]),
  //     zoom: 15
  //   })
  // });

  // data && data[0].buss_stops.map((value) => add_map_point(value.latitude, value.longitude, map))
  //add_map_point('10.781237', '-23.12312', map)

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

function showBuss () {
  data.length === 0 ? 
  $('#show-buss').append("<h1 style='text-align: center'>Nenhuma rota foi encontrado</h1>") :  
  data[0].buss_stops.map((value) => {
    $('#show-buss').append(`<div class='table-row mb-20' onclick='showMap(${value.latitude},${value.longitude})'><p>${value.id}</p><p>${value.street_name}</p><p>${value.latitude}</p><p>${value.longitude}</p></div>`)
  })
}

//$('#show-buss').append(`<div class='table-row mb-20' onclick='showBuss(${value.id})'><p>${value.id}</p></div>`


//onclick="showMap([${value.latitude},${value.longitude}])