import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = props => {
  useEffect(() => {
    const position = props.data[0].geometry.coordinates;
    const map = L.map('map').setView(position, 15);
    setLayer(map);
    setIcon();
    makeMarker(map, props.data);
  }, [props.data]);

  const setLayer = map => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  };

  const setIcon = () => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  };

  const makeMarker = (map, data) => {
    data.map(obj => {
      L.marker(obj.geometry.coordinates).addTo(map).bindPopup(
        `<span><h2>${obj.properties.name}</h2></span>
        <address>
          <strong>Latitud:</strong> ${obj.geometry.coordinates[0]} |${' '}
          <strong>Longitud:</strong> ${obj.geometry.coordinates[1]}
        </address>`
      );
    });
  };

  return <div id="map" style={{ height: '100vh' }} />;
};

export default MapComponent;
