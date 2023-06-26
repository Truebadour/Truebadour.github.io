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

  if (condition==1000) {
    imageSource = 'sun.svg';
  } 
  else if (condition==1003 || condition ==1006 || condition ==1009) {
      imageSource = 'cloud.svg';
      } 
    else if (condition==1030 || condition==1135 || condition==1147) {
        imageSource = 'fog.svg';
      }
    else if (condition==1063 || condition==1072 || condition==1150 || condition==1153 || condition==1180 || condition==1183 || condition==1186 || condition==1198 || condition==1168) {
        imageSource = 'cloud_rain.svg';
    }
    else if (condition==1189 || condition==1192 || condition==1195 || condition==1201 || condition==1207 || condition==1171 || (condition>=1240 && condition<=1252)) {
        imageSource = 'cloud_rain_heavy.svg';
    }
    else if (condition==1066 || condition==1069 || condition==1114 || condition==1117 || condition==1204 || (condition>=1210 && condition<=1237) || (condition>=1255 && condition<=1264) ) {
        imageSource = 'cloud_snow.svg';
    }
    else if ((condition>=1273 && condition<=1282) || condition==1087) {
        imageSource = 'storm.svg';
    }
    else {
        imageSource = 'icon_error.svg';
      };



    console.log(imageSource);

  //  await fetchApiData();
  document.getElementById("city_name").innerText = city;
  document.getElementById("temp_real").innerText = Math.round(tempReal) + " °C";
  document.getElementById("temp_feel_value").innerText =
    Math.round(tempFeel) + "°C ressentis";
  document.getElementById("humidity_value").innerText = humidity + " %";
  document.getElementById("wind_value").innerText = Math.round(wind) + " km/h";
  document.getElementById("weather_icon").innerHTML = `<img src="./assets/${imageSource}">`;
};

window.addEventListener("load", fetchApiData);
// fonction de rafraîchissement de la page toutes les heures
window.setInterval("refresh()", 3600000); // CHANGER 3600 par le nombre de secondes pour tester !

//fonction de rafraîchissement de la page
function refresh() {
  window.location.reload();
}
