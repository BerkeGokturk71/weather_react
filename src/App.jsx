import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import translate from "./helpers/translate";
import ForecastItem from "./components/forecast-item";
import SearchBar from "./components/search-bar"
import ForecastItemList from "./components/forecast-item-list"

function App() {
  const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  //console.log(API_KEY)

  const [city, setCity] = useState("ankara");
  const [lastUpdate,setLastUpdate] = useState("00.00")
  const [forecast, setForecast] = useState([]);

  const getWeather = async (query) => {
    console.log("berke")
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`);
      console.log(response.data,"data burda");
      setLastUpdate(response.data.current.last_updated)
      setCity(response.data.location.name)
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
        <SearchBar city={city} setCity={setCity} getWeather={getWeather} />

       {forecast.length > 0 && (
  <ForecastItem city={city} forecast={forecast} lastUpdate={lastUpdate} translate={translate} />
)}

      </div>
      {forecast.length >0&&(
      <ForecastItemList forecast={forecast} translate={translate} />)}
    </div>
  );
}

export default App;
