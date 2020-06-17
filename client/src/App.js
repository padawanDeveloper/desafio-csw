import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/geo-json`)
      .then(response => response.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>Error al cargar el mapa..</h1>;

  const position = data[0].geometry.coordinates;
  return (
    <div className="App">
      <Map center={position} zoom={15} style={{ height: '100vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map(obj => (
          <Marker key={obj.properties.id} position={obj.geometry.coordinates}>
            <Popup>
              Nombre: {obj.properties.name}
              <br />
              Latitude: {obj.geometry.coordinates[0]}
              <br />
              Longitude: {obj.geometry.coordinates[1]}
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default App;
