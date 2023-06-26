// let apiData = {};

const fetchApiData = async () => {
  await fetch("./conf.json")
    .then((res) => res.json())
    .then((res) => (data = res));
  await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${data.apiKey}&q=${data.ville}&aqi=no`
  )
    .then((res) => res.json())
    .then((res) => (apiData = res));
  // console.log(apiData);
  writeTest();
  showMe();
};

const showMe = async () => {
  console.log(apiData);
};

const writeTest = () => {
  let city = apiData.location.name;
  let tempReal = apiData.current.temp_c;
  let tempFeel = apiData.current.feelslike_c;
  let humidity = apiData.current.humidity;
  let wind = apiData.current.wind_kph;
  //  await fetchApiData();
  document.querySelector(".city_name").innerText = city;
  document.querySelector(".temp_real").innerText =
    "Température : " + tempReal + " °C";
  document.querySelector(".temp_feel").innerText = tempFeel + "°C ressenti"
  document.querySelector(".humidity_text").innerText = humidity + " %";
  document.querySelector(".wind_text").innerText = wind + " km/h";
};

window.addEventListener("load", fetchApiData);
//fonction de rafraîchissement de la page toutes les heures
window.setInterval('refresh()', 3000); // CHANGER "3" par "3600" après test !
    
// Refresh or reload page.
function refresh() {
    window .location.reload();
}
