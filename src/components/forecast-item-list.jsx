export default function ForecastItemList(props){
  const {forecast,translate} = props;
  console.log(props)
  //console.log(forecast,translate);
    return <div className='forecast-container row mt-3 w-50 ms-4'>
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
}