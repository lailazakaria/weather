const apiKey = 'db951193b527aa7f98efb5b1c8a45872';

function displayWeather() {
    const cityInput = document.getElementById('city-input').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cityName = document.querySelector('.city-name');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            // const icon = document.querySelector('.icon')
            const humidity = document.querySelector('.humidity');
            const windSpeed = document.querySelector('.wind-speed');
            const pressure = document.querySelector('.pressure');

            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp -273.15)}°C`;
            description.textContent = data.weather[0].description;
            // icon.textContent = data.weather[0].icon;
            // icon.innerHTML = data.weather[0].description === 'broken clouds' ? 'fas fa-cloud' : 'null'
            let iconCode;
            switch (data.weather[0].icon) {
                case '01d':
                    iconCode = '<i class="fas fa-sun"></i>';
                    break;
                case '02d':
                    iconCode = '<i class="fas fa-cloud-sun"></i>';
                    break;
                case '03d':
                case '04d':
                    iconCode = '<i class="fas fa-cloud"></i>';
                    break;
                case '09d':
                case '10d':
                    iconCode = '<i class="fas fa-cloud-rain"></i>';
                    break;
                case '11d':
                    iconCode = '<i class="fas fa-bolt"></i>';
                    break;
                case '13d':
                    iconCode = '<i class="fas fa-snowflake"></i>';
                    break;
                default:
                    iconCode = '';
            }
            description.innerHTML = `${iconCode} ${data.weather[0].description}`;


            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            pressure.textContent = `Pressure: ${data.main.pressure} hPa`;



            const sunrise = data.sys.sunrise * 1000;
            const sunset = data.sys.sunset * 1000;
            const currentTime = new Date().getTime();
            let box = document.querySelector('.box')

            if (currentTime < sunset && currentTime > sunrise) {
                box.style.backgroundImage = "url('sun.jpg')";
                document.body.style.backgroundColor = '#eee'
            } else {
                box.style.backgroundImage = "url('mm.jpg')";
                document.body.style.backgroundColor = '#080202'


            }
        })
        .catch(error => console.error(error));
}



window.onload = function() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const cityName = document.querySelector('.city-name');
                const temperature = document.querySelector('.temperature');
                const description = document.querySelector('.description');
                const humidity = document.querySelector('.humidity');
                const windSpeed = document.querySelector('.wind-speed');
                const pressure = document.querySelector('.pressure');


                cityName.textContent = data.name;
                temperature.textContent = `${Math.round(data.main.temp -273.15)}°C`;
                description.textContent = data.weather[0].description;

                let iconCode;
                switch (data.weather[0].icon) {
                    case '01d':
                        iconCode = '<i class="fas fa-sun"></i>';
                        break;
                    case '02d':
                        iconCode = '<i class="fas fa-cloud-sun"></i>';
                        break;
                    case '03d':
                    case '04d':
                        iconCode = '<i class="fas fa-cloud"></i>';
                        break;
                    case '09d':
                    case '10d':
                        iconCode = '<i class="fas fa-cloud-rain"></i>';
                        break;
                    case '11d':
                        iconCode = '<i class="fas fa-bolt"></i>';
                        break;
                    case '13d':
                        iconCode = '<i class="fas fa-snowflake"></i>';
                        break;
                    default:
                        iconCode = '';
                }
                description.innerHTML = `${iconCode} ${data.weather[0].description}`;


                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                pressure.textContent = `Pressure: ${data.main.pressure} hPa`;


                const sunrise = data.sys.sunrise * 1000;
                const sunset = data.sys.sunset * 1000;
                const currentTime = new Date().getTime();
                let box = document.querySelector('.box')

                if (currentTime < sunset && currentTime > sunrise) {
                    box.style.backgroundImage = "url('sun.jpg')";
                    document.body.style.backgroundColor = '#eee'
                } else {
                    box.style.backgroundImage = "url('mm.jpg')";
                    document.body.style.backgroundColor = '#080202'


                }
            })
            .catch(error => console.error(error));
    });
};