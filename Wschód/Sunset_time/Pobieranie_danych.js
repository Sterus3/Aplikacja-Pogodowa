// Pobieranie danych o wschodzie i zachodzie słońca
async function fetchSunData() {
    try {
        const response = await fetch('https://calendar.zoznam.sk/sunset-pl.php?city=3103402');
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const table = doc.querySelector('table.sunrise_table');
        if (!table) {
            throw new Error('Nie znaleziono danych o wschodzie/zachodzie słońca.');
        }

        const todayRow = table.querySelector('tr.today');
        if (!todayRow) {
            throw new Error('Nie znaleziono dzisiejszego wiersza.');
        }

        const cells = todayRow.querySelectorAll('td');
        const sunrise = cells[1].textContent.trim();
        const sunset = cells[2].textContent.trim();
        console.log(`Wschód słońca: ${sunrise}, Zachód słońca: ${sunset}`);
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        document.querySelector('.sun-data').innerHTML = '<p>Nie udało się pobrać danych o słońcu.</p>';
    }
}

// Wywołanie funkcji po załadowaniu strony
fetchSunData();
document.addEventListener('DOMContentLoaded', () => {
    fetchSunData();
});