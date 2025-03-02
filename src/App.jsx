import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import translate from "./components/translate";


function App() {
  const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  //console.log(API_KEY)

  const [city, setCity] = useState("Mugla");
  const [lastUpdate,setLastUpdate] = useState("00.00")
  const [forecast, setForecast] = useState([]);

  const getWeather = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`);
      console.log(response.data);
      setLastUpdate(response.data.current.last_updated)
      setForecast(response.data.forecast.forecastday);
    } catch (error) {
      console.error("Hata oluştu: ", error);
      setForecast([]);
    }
  };
  
  return (
    <div className='container d-flex flex-row align-items-center justify-content-center min-vh-100 p-4'>
      
      <div className='card shadow-lg p-4 text-center w-50'>
        <h2 className='mb-3'>Güncel Hava Durumu</h2>
        <div className='input-group mb-3'>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Şehir adı giriniz'
          />
          <button className='btn btn-primary' onClick={getWeather}>Sorgula</button>
        </div>
        {forecast.length > 0 && (
          <div className='current-weather text-center p-3 rounded shadow-sm bg-light'>
            <h4>{city}</h4>
            <img src={`https:${forecast[0].day.condition.icon}`} alt='Hava durumu' className='weather-icon-today' />
            <h5>{translate(forecast[0].day.condition.text)}</h5>
            <p>{forecast[0].date}</p>
            <h3>Ortalama Sıcaklık {Math.round(forecast[0].day.avgtemp_c)} °C</h3>
            <p className="card-text d-flex justify-content-end mt-4"><small className="text-body-secondary"><strong>Son Güncellenme</strong> {lastUpdate}</small></p>
          </div>
        )}
      </div>
      
      <div className='forecast-container row mt-3 w-50 ms-4'>
        <h4 className='text-center mb-4'>Gelecek 2 Gün Hava Tahmini</h4>
        {forecast.slice(1).map((day, index) => (
          <div className='col-md-6 col-lg-6 mb-3' key={index}>
            <div className='card shadow-sm text-center p-3 align-items-center'>
              <h5>{day.date}</h5>
              <img src={`https:${day.day.condition.icon}`} alt='Hava durumu' className='weather-icon' />
              <p>{translate(day.day.condition.text)}</p>
              <h4>Ortalama Sıcaklık {Math.round(forecast[0].day.avgtemp_c)}°C</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
