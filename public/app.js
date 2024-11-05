document.addEventListener('DOMContentLoaded', () => {
  fetch('/weather')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const current = data.current;
      const forecast = data.forecast;

      document.getElementById('current-weather').innerText = 
        `Temperature: ${current.temp_c}°C, Condition: ${current.condition.text}`;

      document.getElementById('weather-forecast').innerHTML = forecast.map(day => 
        `<div>
           <strong>Date:</strong> ${day.date} - 
           <strong>Max:</strong> ${day.day.maxtemp_c}°C, 
           <strong>Min:</strong> ${day.day.mintemp_c}°C - 
           <strong>Condition:</strong> ${day.day.condition.text}
         </div>`
      ).join('');
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('current-weather').innerText = 'Error fetching data';
      document.getElementById('weather-forecast').innerText = 'Please try again later.';
    });
});
