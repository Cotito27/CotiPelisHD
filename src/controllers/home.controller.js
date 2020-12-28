const ctrl = {};

const fetch = require('node-fetch');

let bodyPeli = require('../../peliculas.json');
let bodySerie = require('../../series.json');

let pageNumber = 24;

let currentPage = 1;
function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const jsonfile = require('jsonfile');

ctrl.home = async (req, res) => {
  // let vecVideos = bodyPeli;
  // for(let i=2; i<552; i++) {
  //   let response = await fetch(`https://api.themoviedb.org/3/movie/${i}`, {
  //     headers: {
  //       'Authorization': process.env.API_AUTHORIZATION,
  //       'Content-Type': 'application/json;charset=utf-8'
  //     }
  //   });
  //   let resp = await response.json();
  //   console.log(resp, i);
  //   if(resp.title != undefined) {
  //     vecVideos.push({
  //       "image": `https://image.tmdb.org/t/p/w185_and_h278_bestv2${resp.poster_path}`,
  //       "title": resp.title,
  //       "description": resp.overview,
  //       "genres": resp.genres,
  //       "year": resp.release_date.split('-')[0],
  //       "video": '',
  //       "score": resp.vote_average
  //     });
  //   }
  // }
  // await jsonfile.writeFile('peliculas.json', vecVideos, {spaces: 2}, function(err) {
  //   console.log(err);
  // });

  // res.send(vecVideos);

  // let vecVideos = [];
  // for(let i=1; i<651; i++) {
  //   let response = await fetch(`https://api.themoviedb.org/3/tv/${i}`, {
  //     headers: {
  //       'Authorization': process.env.API_AUTHORIZATION,
  //       'Content-Type': 'application/json;charset=utf-8'
  //     }
  //   });
  //   let resp = await response.json();
  //   console.log(resp, i);
  //   if(resp.name != undefined && resp.poster_path != null) {
  //     if(resp.last_air_date == null) {
  //       resp.last_air_date = '2021-2';
  //     }
  //     if(resp.first_air_date == null) {
  //       resp.first_air_date = '2020-2';
  //     }
  //     vecVideos.push({
  //       "image": `https://image.tmdb.org/t/p/w185_and_h278_bestv2${resp.poster_path}`,
  //       "title": resp.name,
  //       "description": resp.overview,
  //       "genres": resp.genres,
  //       "year": resp.first_air_date.split('-')[0] + '-' + resp.last_air_date.split('-')[0],
  //       "video": '',
  //       "score": resp.vote_average,
  //       "seasons": resp.seasons.length
  //     });
  //   }
  // }
  // await jsonfile.writeFile('series.json', vecVideos, {spaces: 2}, function(err) {
  //   console.log(err);
  // });

  // res.send(vecVideos);
  // console.log(bodyPeli.peliculas);
  let popularVideos = bodyPeli.filter((v) => v.score >= 9);
  popularVideos = popularVideos.slice(popularVideos.length-10);
  let numPaginas = Math.round(bodyPeli.length / pageNumber);
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodyPeli.reverse(), pageNumber, currentPage);
  res.render('index', {
    title: 'CotiPelisHD',
    bodyVideos: pagesActual,
    popularVideos,
    numPaginas,
    pagesInactive: true,
    section: 'Peliculas',
    foundUnic: ''
  });
}

ctrl.peliculas = (req, res) => {
  let popularVideos = bodyPeli.filter((v) => v.score >= 9);
  popularVideos = popularVideos.slice(popularVideos.length-10);
  let numPaginas = Math.round(bodyPeli.length / pageNumber);
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodyPeli.reverse(), pageNumber, currentPage);
  res.render('index', {
    title: 'CotiPelisHD',
    bodyVideos: pagesActual,
    popularVideos,
    numPaginas,
    pagesInactive: false,
    currentPage,
    section: 'Peliculas',
    foundUnic: ''
  });
}

ctrl.series = (req, res) => {
  let popularVideos = bodySerie.filter((v) => v.score >= 9);
  popularVideos = popularVideos.slice(popularVideos.length-10);
  let numPaginas = Math.round(bodySerie.length / pageNumber);
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodySerie.reverse(), pageNumber, currentPage);
  res.render('index', {
    title: 'CotiPelisHD',
    bodyVideos: pagesActual,
    popularVideos,
    numPaginas,
    pagesInactive: false,
    currentPage,
    section: 'Series',
    foundUnic: ''
  });
}

ctrl.getAjaxPeliculas = (req, res) => {
  let numPaginas = Math.round(bodyPeli.length / pageNumber);
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodyPeli.reverse(), pageNumber, currentPage);
  res.send(pagesActual);
}

ctrl.getAjaxSeries = (req, res) => {
  let numPaginas = Math.round(bodySerie.length / pageNumber);
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodySerie.reverse(), pageNumber, currentPage);
  res.send(pagesActual);
}

ctrl.searchPelicula = async (req, res) => {
  let nameVideo = req.params.name;
  
  // let urlSearch = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${nameVideo}`;
  // let response = await fetch(urlSearch);
  // let resp = await response.json();
  nameVideo = nameVideo.replace(/%20/g, ' ');
  let respuesta = bodyPeli.find((v) => v.title == nameVideo);
  res.render('index', {
    title: 'CotiPelisHD',
    section: 'Peliculas',
    bodyVideos: '',
    popularVideos: '',
    numPaginas: '',
    pagesInactive: false,
    currentPage: '',
    foundUnic: respuesta
  });
}

ctrl.searchSerie = async (req, res) => {
  let nameVideo = req.params.name;
  // let urlSearch = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${nameVideo}`;
  // let response = await fetch(urlSearch);
  // let resp = await response.json();
  nameVideo = nameVideo.replace(/%20/g, ' ');
  let respuesta = bodySerie.find((v) => v.title == nameVideo);
  res.render('index', {
    title: 'CotiPelisHD',
    bodyVideos: '',
    popularVideos: '',
    numPaginas: '',
    pagesInactive: false,
    currentPage: '',
    section: 'Series',
    foundUnic: respuesta
  });
}

ctrl.getPeliHome = (req, res) => {
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodyPeli.reverse(), pageNumber, currentPage);
  res.send(pagesActual);
}

ctrl.getSerieHome = (req, res) => {
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodySerie.reverse(), pageNumber, currentPage);
  res.send(pagesActual);
}

ctrl.searchPeliculasSeries = (req, res) => {
  let nameVideo = req.query.name;
  let currentPage = req.params.page || 1;
  
  nameVideo = nameVideo.replace(/%20/g, ' ');
  
  let vecPeliSerie = [...bodyPeli, ...bodySerie];
  let respuesta = vecPeliSerie.filter((v) => v.title.includes(nameVideo));
  let numPaginas = Math.round(respuesta.length / pageNumber) || 1;
  let pagesActual = paginate(respuesta, pageNumber, currentPage);

  if(respuesta.length == 0) {
    res.json({error: 'Not Found'});
    return;
  }
  res.send({
    arrayVideo: pagesActual,
    numberPages: numPaginas,
  });
}

module.exports = ctrl;