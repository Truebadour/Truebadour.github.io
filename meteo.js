// let apiData = {};

const fetchApiData = async () => {
  await fetch("./conf.json")
    .then((res) => res.json())
    .then((res) => (data = res));
  await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${data.apiKey}&q=${data.ville}`
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
    let temp = apiData.current.temp_c;
    let humidity = apiData.current.humidity;
  //  await fetchApiData();
   document.querySelector(".city_name").innerText = "Weather in " + city;
   document.querySelector(".temp_real").innerText = "Température : " + temp;
   document.querySelector(".humidity_text").innerText = "Humidité " + humidity;
 
};

window.addEventListener("load", fetchApiData);
