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
  let condition = apiData.current.condition.code;
  let imageSource;

  // if (condition==1000) {
  //   imageSource = 'sun.svg';
  // } else if (condition==1003 || condition ==1006 || condition ==1009) {
  //   imageSource = 'cloud.svg';
  //   }
  //   else {
  //     imageSource = 'rien';
  //   };

  //  await fetchApiData();
  document.getElementById("city_name").innerText = city;
  document.getElementById("temp_real").innerText = Math.round(tempReal) + " °C";
  document.getElementById("temp_feel_value").innerText =
    Math.round(tempFeel) + "°C ressentis";
  document.getElementById("humidity_value").innerText = humidity + " %";
  document.getElementById("wind_value").innerText = Math.round(wind) + " km/h";
  // document.getElementById("weather_icon").innerHTML = `<img src="./assets/cloud_rain.svg">`;
};

window.addEventListener("load", fetchApiData);
// fonction de rafraîchissement de la page toutes les heures
window.setInterval("refresh()", 3600000); // CHANGER 3600 par le nombre de secondes pour tester !

//fonction de rafraîchissement de la page
function refresh() {
  window.location.reload();
}
