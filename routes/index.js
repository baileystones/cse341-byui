const express = require('express');   
const routes = express.Router();         
const lesson1Controller = require('../controllers/lesson1');

routes.get('/lesson1/curtis', lesson1Controller.curtisRoute);
routes.get('/lesson1/rachel', lesson1Controller.rachelRoute);

module.exports = routes;      