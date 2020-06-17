'use strict';

const csvToJson = csv => {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    let obj = {};
    let row = lines[i],
      queryIdx = 0,
      startValueIdx = 0,
      idx = 0;

    if (row.trim() === '') {
      continue;
    }

    while (idx < row.length) {
      let c = row[idx];

      if (c === '"') {
        do {
          c = row[++idx];
        } while (c !== '"' && idx < row.length - 1);
      }
      if (c === ',' || idx === row.length - 1) {
        let value = row.substr(startValueIdx, idx - startValueIdx).trim();
        if (value[0] === '"') {
          value = value.substr(1);
        }
        if (value[value.length - 1] === ',') {
          value = value.substr(0, value.length - 1);
        }
        if (value[value.length - 1] === '"') {
          value = value.substr(0, value.length - 1);
        }

        const key = headers[queryIdx++];
        obj[key] = value;
        startValueIdx = idx + 1;
      }

      ++idx;
    }

    result.push(obj);
  }
  return new Promise(resolve => resolve(JSON.stringify(result)));
};

const sortArray = (arr, fromIndex, toIndex) => {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
};

const makeData = (geo, csvData) => {
  const array = [];
  geo.forEach(obj => {
    let newObj = { ...obj };
    newObj.geometry.coordinates.pop();
    sortArray(newObj.geometry.coordinates, 0, 1);
    csvData.forEach(({ id, name }) => {
      if (parseInt(obj.properties.id, 10) === parseInt(id, 10)) {
        newObj.properties.name = name;
        array.push(newObj);
      }
    });
  });

  return array;
};

module.exports = { csvToJson, makeData };
