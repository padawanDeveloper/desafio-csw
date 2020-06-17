'use strict';
const { csvToJson } = require('../utils/geo');
const axios = require('axios');
const request = require('request');

const getPoint = () =>
  new Promise((resolve, reject) => {
    axios
      .get(
        'https://cswcl.github.io/fake-api/monumentos_historicos_extracto.geojson'
      )
      .then(response => resolve(response.data))
      .catch(error => {
        reject({ error });
      });
  });

const getCsv = () =>
  new Promise((resolve, reject) =>
    request.get(
      'https://cswcl.github.io/fake-api/monumentos_historicos_extracto.csv',
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const csv = body;
          resolve(csvToJson(csv));
        }
        reject(error);
      }
    )
  );

module.exports = { getPoint, getCsv };
