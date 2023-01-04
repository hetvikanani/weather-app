const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const KelToCal = (data) => {
  return Math.floor(data - 273.15);
};

const addWeatherToPage = (res) => {
  const temp = KelToCal(res.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" /></h2>
  <small>${res.weather[0].main}</small>`;
  main.innerHTML = "";
  main.append(weather);
};

const getWeatherByLocation = async (location) => {
  const resp = await fetch(url(location), { origin: "cros" });
  const response = await resp.json();

  console.log(response);
  addWeatherToPage(response);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = search.value;
  if (inputVal) {
    getWeatherByLocation(inputVal);
  }
  search.value = "";
});
