document.addEventListener('DOMContentLoaded', () => {
  fetch('/weather')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const current = data.current;
      const forecast = data.forecast;

      // Display current weather with icon and temperature
      document.getElementById('current-weather').innerHTML = 
        `<img src="${current.condition.icon}" alt="${current.condition.text}" class="weather-icon">
         <span>Temperature: ${current.temp_c}°C, Condition: ${current.condition.text}</span>`;

      // Display forecast cards with icons and conditional gradient backgrounds
      displayForecast(forecast);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('current-weather').innerText = 'Error fetching data';
      document.getElementById('weather-forecast').innerText = 'Please try again later.';
    });
});

// Function to create and populate forecast cards
function displayForecast(data) {
  const forecastContainer = document.getElementById('weather-forecast');
  forecastContainer.innerHTML = ''; // Clear any existing content

  data.forEach(day => {
    const forecastCard = document.createElement('div');
    forecastCard.className = `col forecast-card ${getGradientClass(day.day.condition.text)}`;
    
    forecastCard.innerHTML = `
      <div class="card h-100 border-0 shadow-sm p-3">
        <div class="card-body text-center">
          <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="weather-icon mb-2">
          <h5 class="card-title">${new Date(day.date).toLocaleDateString('en-AU', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}</h5>
          <p class="card-text"><strong>Max:</strong> ${day.day.maxtemp_c}°C</p>
          <p class="card-text"><strong>Min:</strong> ${day.day.mintemp_c}°C</p>
          <p class="card-text"><em>${day.day.condition.text}</em></p>
        </div>
      </div>
    `;

    forecastContainer.appendChild(forecastCard);
  });
}

// Function to return gradient class based on weather condition
function getGradientClass(condition) {
  if (condition.toLowerCase().includes('sunny')) {
    return 'sunny-gradient';
  } else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('overcast')) {
    return 'overcast-gradient';
  }
  return 'default-gradient';
}
