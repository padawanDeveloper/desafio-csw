'use strict';
const { makeData } = require('../utils/geo');
const { getCsv, getPoint } = require('../services/geo');

const getGeoJson = async (req, res) => {
  console.log('geo');
  const dataCsv = await getCsv();
  const data = await getPoint();
  const csvParse = await JSON.parse(dataCsv);

  if (data.features) {
    const parseData = makeData(data.features, csvParse);
    return res.status(200).send({ data: parseData });
  }
  return res.status(400).send({ message: 'error' });
};

module.exports = { getGeoJson };
