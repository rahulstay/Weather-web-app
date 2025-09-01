const input = document.getElementById("inp");
const searchicon = document.getElementById("s");
const apikey = "";
const temp = document.getElementById("temp");
const cityEl = document.getElementById("city");
const sun = document.getElementById("sun");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("win");
const con1 = document.querySelector(".con1");
const err = document.querySelector(".err");

const apiurl = "https://api.openweathermap.org/data/2.5/weather";

async function getdata(cityName) {
    const response = await fetch(`${apiurl}?q=${cityName}&appid=${apikey}&units=metric`);

    if (response.status === 404) {
        err.style.display = "block";
        con1.style.display = "none";
    } else {
        const data = await response.json();
        console.log(data); // Check what API is returning

        err.style.display = "none";
        con1.style.display = "flex";

        cityEl.innerHTML = data.name;
        temp.innerHTML = data.main.temp + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        windspeed.innerHTML = data.wind.speed + " Km/h";

        // Normalize condition string
        let weatherMain = data.weather[0].main.toLowerCase();

        if (weatherMain.includes("cloud")) {
            sun.src = "./assets/cloudy.png";
        } else if (weatherMain.includes("clear")) {
            sun.src = "./assets/sun.png";
        } else if (weatherMain.includes("rain")) {
            sun.src = "./assets/rain.png";
        } else if (weatherMain.includes("drizzle")) {
            sun.src = "./assets/sunny.png";
        } else if (weatherMain.includes("mist") || weatherMain.includes("fog")) {
            sun.src = "./assets/fog.png";
        } else if (weatherMain.includes("snow")) {
            sun.src = "./assets/snowflake.png";
        } else {
            sun.src = "./assets/weather.png"; // default
        }
    }
}

searchicon.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        getdata(input.value);
        
    }
}
    
);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
        getdata(input.value);
        
    }
   
});
