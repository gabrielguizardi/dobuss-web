window.onload = function() {
  requestApi()
};

function requestApi() {
  $.ajax({
    url: 'http://localhost:3333/busses',
    type: 'GET',
    dataType: 'json',
    crossDomain: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function(res) {
    // res.data.body
    console.log(res)
    listBuss(res)
  })
  .catch(function(err) {                
    console.log(err)
  });
}

function showBuss(value) {
  $(location).prop('href', `show.html?id=${value}`)
}

function listBuss (data) {
  data.length === 0 ? 
  $('#show-buss').append("<h1 style='text-align: center'>Nenhuma rota foi encontrado</h1>") :  
  data.map((value) => $('#show-buss').append(`<div class='table-row mb-20' onclick='showBuss(${value.routes[0].id})'><p>${value.id}</p><p>${value.model}</p><p>${value.brand}</p><p>${value.plate}</p></div>`)) 
}
