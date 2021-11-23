data = [
  {
    id: 2,
    buss_id: 1,
    created_at: "2021-11-21 17:55:30",
    updated_at: "2021-11-21 17:55:30",
    buss: {
      id: 1,
      model: "1001 - R KING",
      brand: "Mercedes",
      plate: "RKNG 1001",
      created_at: "2021-11-21 16:51:06",
      updated_at: "2021-11-21 16:51:06"
    }
  },
  {
    id: 3,
    buss_id: 1,
    created_at: "2021-11-22 11:49:04",
    updated_at: "2021-11-22 11:49:04",
    buss: {
      id: 1,
      model: "1001 - R KING",
      brand: "Mercedes",
      plate: "RKNG 1001",
      created_at: "2021-11-21 16:51:06",
      updated_at: "2021-11-21 16:51:06"
    }
  }
]





window.onload = function() {
  listBuss ()
};

function requestApi() {
  $.ajax({
    url: 'url',
    type: 'POST',
    dataType: 'json',
    crossDomain: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data: body
  })
  .then(function(res) {
    console.log(res)
  })
  .catch(function(err) {                
    console.log(err)
  });
}

function showBuss(value) {
  $(location).prop('href', `show.html?id=${value}`)
}

function listBuss () {
  data.length === 0 ? 
  $('#show-buss').append("<h1 style='text-align: center'>Nenhuma rota foi encontrado</h1>") :  
  data.map((value) => $('#show-buss').append(`<div class='table-row mb-20' onclick='showBuss(${value.id})'><p>${value.id}</p><p>${value.buss.id}</p><p>${value.buss.model}</p><p>${value.buss.brand}</p><p>${value.buss.plate}</p></div>`)) 
}
