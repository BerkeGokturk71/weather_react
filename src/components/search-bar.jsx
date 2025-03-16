import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar({ city, setCity, getWeather }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [queryCity, setQueryCity] = useState(city);
  const [suggestions, setSuggestions] = useState([]); 

  const BASE_URL = "http://api.weatherapi.com/v1/search.json"; 
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!queryCity) return;
    const timeout = setTimeout(() => {
      fetchData(queryCity);
    }, 500); 
    return () => clearTimeout(timeout);
  }, [queryCity]);

  const fetchData = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}`);
      console.log(response)
      setSuggestions(response.data);
    } catch (error) {
      console.error("hata:",error);
    }
  };

  return (
    <div className="position-relative">
      <div className="input-group mb-2">
        <input
          value={queryCity}
          onChange={(e) => {
             
            setQueryCity(e.target.value); 
            setShowDropdown(true); 
          }}
          type="text"
          className="form-control"
          placeholder="Şehir adı giriniz"
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button className="btn btn-primary" onClick={() => {
            setCity(queryCity); 
            getWeather(queryCity);
          }}
        >
          Getir
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="dropdown-menu show w-100" >
          {suggestions.map((item, index) => (
          
            <button
              key={index}
              className="dropdown-item"
              onClick={() => {
                
                setQueryCity(item.name);
                setCity(item.name);
                setShowDropdown(false);
                getWeather(queryCity);
              }}
        
            >
              {item.name}, {item.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
