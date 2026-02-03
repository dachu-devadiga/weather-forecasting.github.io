const apiKey = "e2507ea29d960cf09b0ce1fb80d33551"; // your API key

async function getWeather(cityName) {
  const city = cityName || document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();

    // IMPORTANT FIX
    if (data.cod == 404) {
      alert("City not found");
      return;
    }

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText =
      "💧 " + data.main.humidity + "%";
    document.getElementById("wind").innerText =
      "💨 " + data.wind.speed + " m/s";

    document.getElementById("icon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    getForecast(city);

  } catch (error) {
    alert("Network error");
    console.error(error);
  }
}

async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  const data = await res.json();

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  for (let i = 0; i < data.list.length; i += 8) {
    const day = data.list[i];
    forecastDiv.innerHTML += `
      <div class="card">
        <p>${new Date(day.dt_txt).toDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
        <p>${day.main.temp}°C</p>
      </div>
    `;
  }
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();
    getWeather(data.name);
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 