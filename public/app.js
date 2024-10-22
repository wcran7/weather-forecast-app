document.addEventListener('DOMContentLoaded', () => {
    fetch('/weather')
      .then(response => response.json())
      .then(data => {
        document.getElementById('current-weather').innerText = `Temp: ${data.current.temp}°C, ${data.current.weather[0].description}`;
        document.getElementById('weather-forecast').innerText = data.forecast.map(day => 
          `${day.temp.day}°C - ${day.weather[0].description}`).join('\n');
      });
  });
  