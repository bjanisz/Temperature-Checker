const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    "X-RapidAPI-Key": "cb30f6b1abmsh4f8e050a455d139p159f06jsn95c546a1f414",
  },
};

const cityInput = document.getElementById("cityInput");
const cityPlaceholder = document.getElementById("cityPlaceholder");
const temperaturePlaceholder = document.getElementById(
  "temperaturePlaceholder"
);
const conditionPlaceholder = document.getElementById("conditionPlaceholder");
const condtitionImage = document.getElementById("myImg");

cityPlaceholder.style.visibility = "hidden";
temperaturePlaceholder.style.visibility = "hidden";

cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("searchButton").click();
  }
});

function citySearch() {
  const citySearch = document.getElementById("cityInput");
  const city = citySearch.value;
  cityPlaceholder.style.visibility = "visible";
  temperaturePlaceholder.style.visibility = "visible";

  fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
    .then((response) => response.json())
    .then(collectedData)
    .catch((error) => {
      cityPlaceholder.innerHTML = "You did not enter a correct city!";
      temperaturePlaceholder.style.visibility = "hidden";
      conditionPlaceholder.style.visibility = "hidden";
      condtitionImage.style.visibility = "hidden";
    })
    
  if (city !== "") {
    cityPlaceholder.innerHTML = `The temperature in ${city} is`;
    conditionPlaceholder.innerHTML = "Today's weather condition:";
    citySearch.value = "";
    condtitionImage.style.visibility = "visible";
    setTimeout(collectedData, 1000);
  } else {
    cityPlaceholder.innerHTML = "You did not enter a correct city!";
    conditionPlaceholder.innerText = "";
    temperaturePlaceholder.innerText = "";
    condtitionImage.style.visibility = "hidden";
  }
}

const collectedData = (data) => {
  
  const myTemperature = data.current.temp_c;
  temperaturePlaceholder.innerHTML = `${myTemperature} &#8451`;
  const condition = data.current.condition.icon;
  condtitionImage.src = `${condition}`;

  let temperatureChecker = `${myTemperature}`;

  if (temperatureChecker >= 20) {
    temperaturePlaceholder.style.color = "Maroon";
    temperaturePlaceholder.style.fontSize = "30px";
  } else if (temperatureChecker <= 6) {
    temperaturePlaceholder.style.color = "blue";
    temperaturePlaceholder.style.fontSize = "30px";
  } else {
    temperaturePlaceholder.style.color = "black";
    temperaturePlaceholder.style.fontSize = "30px";
  }
};
