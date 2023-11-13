import { useEffect, useState } from 'react';
import './App.css';
//import Icons from './componentes/Icons/Icons.jsx';
//import Footer from './componentes/Footer/Footer.jsx';

const App = () => {
  const [search, setSearch] = useState('rome');
  const [values, setValues] = useState('');
  const [icon, setIcon] = useState('');

  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${process.env.REACT_APP_API_KEY}';

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod >= 400) {
        setValues(false);
      } else {
        setIcon(data.weather[0].main);
        setValues(data);
      }
    } catch (error) {
      console.log('Tenemos un error y no podemos mostrar la información');
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <>
      <div className="container">
        <h2>React Weather App</h2>
        <div className="row">
          <input onKeyDown={handleSearch} type="text" autoFocus />
        </div>
      </div>

      <div className="card">
        {values ? (
          <div className="card-container">
            <h1 className="city-name">{values.name}</h1>
            <p className="temp">{values.main.temp.toFixed(0)}&deg;</p>
            <img
              className="icon"
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt="icon-weather"
            />
            <div className="card-footer">
              <p className="temp-max-min">
                {`${values.main.temp_min.toFixed(0)}° | ${values.main.temp_max.toFixed(0)}°`}
              </p>
            </div>
          </div>
        ) : (
          <h1>{"City not found"}</h1>
        )}
        <footer/>
      </div>
    </>
  );
};

export default App;