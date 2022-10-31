import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import TopCitiesCard from './TopCitiesCard';

function App() {

  const KEY = '31a18a835d0a8812565deccb56d020b3';
  const [weatherData, setWeatherData] = useState([]);
  const [windData, setWindData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [cityName, setCityName] = useState('London');
  const [search, setSearch] = useState(false);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${KEY}`)
      .then(response => {
        setWeatherData(response.data.weather);
        setWindData([response.data.wind]);
        setMainData([response.data.main]);
      })
  }, [search])


  return (
    <div className="App">
      <Header />
      <div className="top-cities-area">
        <h1>Top Cities</h1>
        <div className="top-wrapper">
          <TopCitiesCard name='Tokyo' />
          <TopCitiesCard name='London' />
          <TopCitiesCard name='Istanbul' />
          <TopCitiesCard name='Washington' />
          <TopCitiesCard name='Berlin' />
          <TopCitiesCard name='Paris' />
        </div>
      </div>
      <div className="input-area">
        <div className="input-header">
          <h2>Specific Search</h2>
        </div>
        <div>
          <input onChange={(e) => { setCityName(e.target.value) }} placeholder='City Name (etc:London)' type="text" />
          <button onClick={() => { setSearch(!search) }}>Search</button>
        </div>
      </div>
      {
        <div className='card'>
          <div>
            <p className='city-name'>{cityName}</p>
            {
              weatherData.map((weather) => {
                const { id, main, icon } = weather;
                return (
                  <div className='weather' key={id}>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
                    <p>{main}</p>
                  </div>
                )
              })
            }
          </div>
          <div>
            {
              mainData.map((main) => {
                const { feels_like, temp, temp_max, temp_min, humidity } = main;
                return (
                  <div className='main'>
                    <p>Feels Like: {(feels_like - 273.15).toFixed(0)} °C</p>
                    <p>Temperature : {(temp - 273.15).toFixed(0)} °C</p>
                    <p>Max Temperature: {(temp_max - 273.15).toFixed(0)} °C</p>
                    <p>Min Temperature: {(temp_min - 273.15).toFixed(0)} °C</p>
                    <p>Humidity: %{humidity}</p>
                  </div>
                )
              })
            }
          </div>
          <div>
            {
              windData.map((wind) => {
                const { speed, deg } = wind;
                return (
                  <div className='wind'>
                    <p>Wind Degree: {deg} °</p>
                    <p>Wind Speed: {speed} kn/kt</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  );
}

export default App;

/* https://api.api-ninjas.com/v1/geocoding?city=London&country=England */

/*VL0YL4lIj3Q/GO2jeWT9dQ==Y87DfcIGB5OKtFVm */