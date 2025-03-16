const ForecastItem = (props) => {
  const { city, forecast, lastUpdate, translate } = props;
  if (!forecast || forecast.length === 0) {
    return <p>Hava durumu verisi bulunamadı.</p>;
  }
  console.log(forecast[0])
  return (
    
    <div className="current-weather text-center p-3 rounded shadow-sm bg-light">
      <h4>{city}</h4>
      <img
        src={`https:${forecast[0].day.condition.icon}`}
        alt="Hava durumu bilgisi yok"
        className="weather-icon-today"
      />
      <h5>{translate(forecast[0].day.condition.text)}</h5>
      <p>{forecast[0].date}</p>
      <h3>Ortalama Sıcaklık {Math.round(forecast[0].day.avgtemp_c)} °C</h3>
      <p className="card-text d-flex justify-content-end mt-4">
        <small className="text-body-secondary">
          <strong>Son Güncellenme</strong> {lastUpdate}
        </small>
      </p>
    </div>
  );
};

export default ForecastItem;
