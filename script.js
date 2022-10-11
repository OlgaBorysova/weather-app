function formatDate(currentDate) {
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "September",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthes[currentDate.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuestay",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  return `${day}, ${hours}:${minutes}, ${month} ${date}, ${year}`;
}
let currentDate = new Date();
let today = document.querySelector("#today-date");
today.innerHTML = formatDate(currentDate);
///
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#my-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

search("Odessa");

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoind = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let units = "metric";
  let apiURL = `${apiEndpoind}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getCurrentPosition);
