async function fetchWeatherData(city) {
    const apiKey = '07e21b9fc82b082f3fa3893ce5d6899b'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Nie znaleziono danych dla miasta: ${city}`);
        }

        const data = await response.json();
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;

        console.log(`Pogoda w ${city}:`);
        console.log(`Temperatura: ${temperature}°C`);
        console.log(`Opis: ${description}`);
        console.log(`Wilgotność: ${humidity}%`);

        document.getElementById('weather-city').textContent = city;
        document.getElementById('weather-temp').textContent = `${temperature}°C`;
        document.getElementById('weather-desc').textContent = description;
        document.getElementById('weather-humidity').textContent = `Wilgotność: ${humidity}%`;
    } catch (error) {
        console.error('Błąd podczas pobierania danych pogodowych:', error);
        document.querySelector('.weather-data').innerHTML = `<p>${error.message}</p>`;
    }
}