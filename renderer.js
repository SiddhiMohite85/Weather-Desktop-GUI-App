const https = require('https');

window.getWeather = () => {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!city) {
        resultDiv.innerText = '⚠️ Please enter a city.';
        return;
    }

    const apiKey = '1f618d14c95a5c504edfa2e72e405bda'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (res) => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const weather = JSON.parse(data);
                if (weather.cod !== 200) {
                    resultDiv.innerText = `❌ Error: ${weather.message}`;
                    return;
                }

                resultDiv.innerHTML = `
                    <h3>📍 ${weather.name}, ${weather.sys.country}</h3>
                    <p>🌡 Temp: ${weather.main.temp}°C</p>
                    <p>🌡 Feels like: ${weather.main.feels_like}°C</p>
                    <p>☁ ${weather.weather[0].description}</p>
                    <p>💧 Humidity: ${weather.main.humidity}%</p>
                    <p>🌬 Wind: ${weather.wind.speed} m/s</p>
                `;
            } catch (e) {
                resultDiv.innerText = '⚠️ Could not parse data.';
            }
        });
    }).on('error', (err) => {
        resultDiv.innerText = `❌ Request error: ${err.message}`;
    });
};
