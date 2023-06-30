// Clé de l'API "weatherapi.com", ne pas modifier !
let apiKey = "d7110859a3d64a4e86695518232306";

//Fonction allant chercher les données de conf.json pour compléter la requête vers l'API de "weatherapi.com".
const fetchApiData = async () => {
  await fetch("./conf.json")
    .then((res) => res.json())
    .then((res) => (data = res));

  await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data.ville}&aqi=no`
  )
    .then((res) => res.json())
    .then((res) => (apiData = res));

  writeInfo();
  showMe();
};

// Fonction permettant d'afficher les données renvoyées par l'API dans la console du navigateur.
const showMe = async () => {
  console.log(apiData);
};

// Fonction utilisée pour écrire les données dans l'interface de l'appli web.
const writeInfo = () => {
  // déclaration des variables utilisées pour inscrire les données météo.
  let city = apiData.location.name;
  let tempReal = apiData.current.temp_c;
  let tempFeel = apiData.current.feelslike_c;
  let humidity = apiData.current.humidity;
  let wind = apiData.current.wind_kph;
  let condition = apiData.current.condition.code;
  let imageSource;
  let weatherDescription;
  
  // attribution de l'image à employer en fonction du code météo renvoyé par l'API. Chaque type de temps est décrit par une phrase et une icône. Les icônes sont trop petites, elles sont donc remplacées par un fichier .svg pour permettre une structure responsive. Il y a plus de types de conditions météorologiques que d'images .svg donc les conditions sont rassemblées quand elles sont proches.
  // L'idéal aurait été de faire un switch.
  if (condition == 1000) {
    imageSource = "sun.svg"
    weatherDescription = "Ensoleillé";
  } else if (condition == 1003 || condition == 1006 || condition == 1009) {
    imageSource = "cloud.svg"
    weatherDescription = "Temps nuageux";
  } else if (condition == 1030 || condition == 1135 || condition == 1147) {
    imageSource = "fog.svg"
    weatherDescription = "Brouillard";
  } else if (
    condition == 1063 ||
    condition == 1072 ||
    condition == 1150 ||
    condition == 1153 ||
    condition == 1180 ||
    condition == 1183 ||
    condition == 1186 ||
    condition == 1198 ||
    condition == 1168
  ) {
    imageSource = "cloud_rain.svg"
    weatherDescription = "Averses";
  } else if (
    condition == 1189 ||
    condition == 1192 ||
    condition == 1195 ||
    condition == 1201 ||
    condition == 1207 ||
    condition == 1171 ||
    (condition >= 1240 && condition <= 1252)
  ) {
    imageSource = "cloud_rain_heavy.svg"
    weatherDescription = "Pluie";
  } else if (
    condition == 1066 ||
    condition == 1069 ||
    condition == 1114 ||
    condition == 1117 ||
    condition == 1204 ||
    (condition >= 1210 && condition <= 1237) ||
    (condition >= 1255 && condition <= 1264)
  ) {
    imageSource = "cloud_snow.svg"
    weatherDescription = "Neige";
  } else if ((condition >= 1273 && condition <= 1282) || condition == 1087) {
    imageSource = "storm.svg"
    weatherDescription = "Orages";
  } else {
    imageSource = "icon_error.svg";
  }


  // Partie de la fonction permettant d'écrire les données dans index.html pour les afficher.
  document.getElementById("city_name").innerText = city;
  document.getElementById("temp_real").innerText = Math.round(tempReal) + "°C";
  document.getElementById("temp_feel_value").innerText = Math.round(tempFeel) + "°C ressentis";
  document.getElementById("humidity_value").innerText = humidity + " %";
  document.getElementById("wind_value").innerText = Math.round(wind) + " km/h";
  document.getElementById(
    "weather_icon"
  ).innerHTML = `<img id="weather_icon_container" src="./assets/${imageSource}">`;
  document.getElementById("weather_description").innerText = weatherDescription;
};


// Instruction déclenchant la fonction de récupération des données de l'API.
window.addEventListener("load", fetchApiData);
//Instruction déclenchant la fonction de rafraîchissement de la page toutes les heures
window.setInterval("refresh()", 3600000); // exprimé en millisecondes. Testé et fonctionnel quand réglé sur 3 secondes.

//fonction de rafraîchissement de la page
function refresh() {
  window.location.reload();
}
