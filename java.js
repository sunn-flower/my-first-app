let now = new Date();
now.toLocaleString("en-US", {
	hour12: false,
	hour: "2-digit",
	minute: "2-digit",
});
let h2 = document.querySelector("h2");
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
h2.innerHTML = `${day} ${hour}:${minute}`;

//function changeTempUnit() {
//let tempHigh = document.querySelector("#fahrenheit-current-high");
//let tempLow = document.querySelector("#fahrenheit-current-low");
//tempHigh.innerHTML = "37°C";
//tempLow.innerHTML = "16°C";
//}
//let unitButton = document.querySelector("#temp-unit");
//unitButton.addEventListener("click", changeTempUnit);

function showTemperature(response) {
	document.querySelector("#city-name").innerHTML = response.data.name;
	//document.querySelector("#current-temp").innerHTML = Math.round(
	//response.data.main.temp
	//);
	let currentHighTemp = document.querySelector("#fahrenheit-current-high");
	let currentLowTemp = document.querySelector("#fahrenheit-current-low");
	highTemp = Math.round(`${response.data.main.temp_max}`);
	lowTemp = Math.round(`${response.data.main.temp_min}`);
	currentHighTemp.innerHTML = `${highTemp}°F`;
	currentLowTemp.innerHTML = `${lowTemp}°F`;
}
function searchForCity(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input").value;
	let apiKey = "23e5c32242e8082ee2e13b831cfd6fb5";
	let units = "imperial";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchForCity);

function showCurrentCityInfo(position) {
	let apiKey = "35da13ca923045c063dfdf0a5627b0fd";
	let units = "imperial";
	let lat = `${position.coords.latitude}`;
	let lon = `${position.coords.longitude}`;
	let h1 = document.querySelector("h1");
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function currentCityEvent() {
	navigator.geolocation.getCurrentPosition(showCurrentCityInfo);
}

let currentCityButton = document.querySelector("#show-current-city");
currentCityButton.addEventListener("click", currentCityEvent);
