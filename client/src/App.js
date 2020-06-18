import React, { useEffect, useState } from 'react';
import Map from './components/Map';

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

  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;
