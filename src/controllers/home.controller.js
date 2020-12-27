const ctrl = {};
let bodyPeli = require('../../peliculas.json');
let popularPelis = bodyPeli.peliculas.slice(bodyPeli.peliculas.length - 10);
let pageNumber = 24;
let numPaginas = Math.round(bodyPeli.peliculas.length / pageNumber);
let currentPage = 1;
function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
ctrl.home = (req, res) => {
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodyPeli.peliculas, pageNumber, currentPage);
  res.render('index', {
    title: 'CotiPelisHD',
    bodyPeli: pagesActual,
    popularPelis,
    numPaginas,
    pagesInactive: true
  });
}

ctrl.peliculas = (req, res) => {
  let currentPage = req.params.page || 1;
  let pagesActual = paginate(bodyPeli.peliculas, pageNumber, currentPage);
  res.render('index', {
    title: 'CotiPelisHD',
    bodyPeli: pagesActual,
    popularPelis,
    numPaginas,
    pagesInactive: false,
    currentPage
  });
}

module.exports = ctrl;