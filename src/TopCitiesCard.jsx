import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './topcities.css'

function TopCitiesCard(props) {

    const KEY = '31a18a835d0a8812565deccb56d020b3';
    const [weatherData, setWeatherData] = useState([]);
    const [windData, setWindData] = useState([]);
    const [mainData, setMainData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.name}&appid=${KEY}`)
            .then(response => {
                setWeatherData(response.data.weather); 
                setWindData([response.data.wind]);
                setMainData([response.data.main]);
            })
    }, [])

    return (
        <div className='topcities-card'>
            {
                <div className='top-card'>
                    <div>
                        <p className='city-name'>{props.name}</p>
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
    )
}

export default TopCitiesCard

/*

        

*/
