var apikey = "apikey=" + "27a0e2a2";
var busqueda = "";
var peliculas = "";
var favoritos = [];
// var peliculaIterando = "";

function getFavoritos() {
  var datos = localStorage.getItem("peliculasFavoritos");

  if (datos !== null) {
    favoritos = JSON.parse(datos);
    // console.log('favoritos cargados');
    
  }
}

getFavoritos();

function dibujarPeliculas(peliculas, sector) {
  for (var i = 0; i < peliculas.length; i++) {
    // peliculaIterando = peliculas.Search[i];
    dibujarPelicula(peliculas[i], sector);
    // dibujarPelicula('movies');
  }
}

// function mostrarDetallePelicula(pelicula) {}

function dibujarPelicula(pelicula, sector) { // favorito
  var movieTemplate = $("#movie-card").html(); // string
  var div = $(movieTemplate);
  debugger;
  div.find(".movie-title").text(pelicula.Title);
  div.find("#movie-release-date").text(pelicula.Year);
  div.find("#movie-type").text(pelicula.Type);
  div.find(".movie-header").css('background-image', 'url("' + pelicula.Poster + '")');
  div.appendTo("#" + sector);

  if (sector === "movies") {
    div.click(function () {
      abrirModal(pelicula.imdbID);
    });

  } else {

    div.click(function () {
      $('#modal-view').modal('show');
      cargarDataModal(pelicula, 'favoritos');
    });
  }

}


$('#button').on("click", function () {

  busqueda = $("#search").val();
  var parametros = {
    url: "http://www.omdbapi.com/?s=" + busqueda + "&" + apikey
  };
  // console.log(parametros);
  $.ajax(parametros).done(function (data) {
    console.log(data.Search);
    var peliculas = data.Search;
    //console.log('datasearch ' + peliculas);

    dibujarPeliculas(peliculas, "movies");
  });
});

function abrirModal(imdbID) {
  var parametros = {
    url: "http://www.omdbapi.com/?i=" + imdbID + "&" + apikey
  };
  // console.log(parametros);
  $.ajax(parametros).done(function (data) {
    $('#modal-view').modal('show');
    // console.log(data);
    var peliculaData = data;
    // console.log('datasearch ' + peliculaData);

    cargarDataModal(peliculaData, 'movies');
  });
}

function cargarDataModal(peliculaData, sector) {
  var div = $('#modal-view');
  div.find("#modal-title").text(peliculaData.Title);
  div.find("#modal-year").text(peliculaData.Year);
  div.find("#modal-plot").text(peliculaData.Plot);
  div.find("#modal-released").text(peliculaData.Released);
  div.find("#modal-rating").text(peliculaData.imdbRating);
  div.find("#modal-votes").text(peliculaData.imdbVotes);
  div.find("#modal-director").text(peliculaData.Director);
  div.find("#modal-actors").text(peliculaData.Actors);
  div.find("#modal-awards").text(peliculaData.Awards);
  div.find("#modal-writer").text(peliculaData.Writer);
  // div.find("#modal-type").text(peliculaData.Type);
  div.find("#modal-poster").attr('src', peliculaData.Poster);

  // favs
  // chain methods

  if (sector === 'movies') {
    $('#modal-add-to-favorite').off('click').on('click', function () {
      favoritos.push(peliculaData);
      localStorage.setItem("peliculasFavoritos", JSON.stringify(favoritos));
      /* noticias.splice(posicion, 1);
       $("#" + noticia.id).remove();*/
    });
    $('#modal-remove-from-favorite').hide();
  } else {
    $('#modal-add-to-favorite').show();
  }


}

//nav
$('#nav-favoritos').on('click', function () {
  $('#movies').hide();
  $('#favoritos').show();
  dibujarPeliculas(favoritos, 'favoritos');
});
$('#nav-home').on('click', function () {
  $('#favoritos').hide();
  $('#movies').show();
});