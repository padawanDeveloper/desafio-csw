'use strict';

const express = require('express');
const api = express.Router();

const GeoController = require('../controllers/Geo');

//POST
api.get('/geo-json', GeoController.getGeoJson);

module.exports = api;
