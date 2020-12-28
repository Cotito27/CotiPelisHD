const express = require("express");
const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.home);
router.get('/peliculas/pages/:page', homeController.peliculas);
router.get('/pelicula/:name', homeController.searchPelicula);
router.get('/series/pages/:page', homeController.series);
router.get('/serie/:name', homeController.searchSerie);
router.get('/getPeli', homeController.getPeliHome);
router.get('/getSerie', homeController.getSerieHome);
router.get('/searchPeliculasSeries/:page', homeController.searchPeliculasSeries);
router.get('/getAjaxPeliculas/:page', homeController.getAjaxPeliculas);
router.get('/getAjaxSeries/:page', homeController.getAjaxSeries);

module.exports = { router };
