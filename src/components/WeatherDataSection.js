import { Component, useEffect, useState } from "react";
import loaderImg from "./../Images/loader.svg";
import apiKey from "./../components/apikey";
import sunImage from "./../Images/Sunny.png";
import RainImage from "./../Images/rainy.webp";
import cloudImage from "./../Images/cloud.webp";
import clearImage from "./../Images/clearWeather.png";
import NormalImage from "./../Images/Normal.png";
function WeatherData(props) {
  const [loading, setLoading] = useState(true);
  const [fetchedData, SetFetchData] = useState({ hourly: [] });
  console.log("prop outside: ", props);
  useEffect(
    async (prprops) => {
      setLoading(true);
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${props.countryData[0]}&lon=${props.countryData[1]}&units=metric&exclude=minutely&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((res) => {
          SetFetchData(res);
          console.log("Fetch:", res);
          console.log("cou", prprops);
          console.log("prop:", props);
        })
        .then(() => setLoading(false));
    },
    [props]
  );

  if (loading) {
    return (
      <div className="WeatherDetails" style={{ textAlign: "center" }}>
        <h1>LOADING...</h1>
        <div className="loader">
          <img src={loaderImg} />
        </div>
      </div>
    );
    //code which executes while data is rendering
  } else {
    //data when loading completes

    const hourly = fetchedData.hourly.map((HourlyData) => {
      const Image =
        HourlyData.weather[0].main.search(/clouds/i) !== -1
          ? cloudImage
          : HourlyData.weather[0].main.search(/rain/i) !== -1
          ? RainImage
          : HourlyData.weather[0].main.search(/sun/i) !== -1
          ? sunImage
          : HourlyData.weather[0].main.search(/clear/i) !== -1
          ? clearImage
          : NormalImage;
      return (
        <div className="timedData">
          {new Date(HourlyData.dt * 1000).getHours()}:
          {new Date(HourlyData.dt * 1000).getMinutes()}
          <br />
          <img
            style={{ height: 55, width: 55, border: 0, margin: 0 }}
            src={Image}
            alt="weather condition"
          />
          <br />
          {HourlyData.temp}&deg;C
          <br />
        </div>
      );
    });

    //function to scroll Weather data horizontally
    const scrollHorizontol = () => {
      function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        document.getElementById("hourlyData").scrollLeft -= delta * 200; // Multiplied by 40
        e.preventDefault();
      }
      if (document.getElementById("hourlyData").addEventListener) {
        // IE9, Chrome, Safari, Opera
        document
          .getElementById("hourlyData")
          .addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        document
          .getElementById("hourlyData")
          .addEventListener("DOMMouseScroll", scrollHorizontally, false);
      } else {
        // IE 6/7/8
        document
          .getElementById("divv")
          .attachEvent("onmousewheel", scrollHorizontally);
      }
    };
    //End of function to scroll Weather data horizontally

    //return this from the function
    return (
      <div className="WeatherDetails">
        Current Weather: {fetchedData.current.temp}&deg;C
        <br />
        Feels Like: {fetchedData.current.feels_like}&deg;C
        <br />
        Pressure: {fetchedData.current.pressure}hpa
        <br />
        UV Index: {fetchedData.current.uvi}
        <br />
        Next few hours data:
        <br />
        <div className="hourlyData" onLoad={scrollHorizontol} id="hourlyData">
          {hourly}
        </div>
      </div>
    );
  }
}

export default WeatherData;
