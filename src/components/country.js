import style from "./countryListStyle.css";
import sunImage from "./../Images/Sunny.png";
import RainImage from "./../Images/rainy.webp";
import cloudImage from "./../Images/cloud.webp";
import clearImage from "./../Images/clearWeather.png";
import NormalImage from "./../Images/Normal.png";
import { useEffect, useState } from "react";

function Country(props) {
  const [WeatherData, setWeather] = useState({});
  const [isloading, ChangeLoadingState] = useState(true);

  //Use this inside useEffect in last state()
  /*  */
  //Use this end
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${props.country.lat}&lon=${props.country.lon}&units=metric&exclude=minutely&appid=9cf9f84e5556caab05f05ecd5a9ddd13`
    )
      .then((response) => response.json())
      .then((response) => {
        setWeather(response);
      })
      .then(() => ChangeLoadingState(false));
  }, []);
  if (isloading)
    return (
      <div className="component" style={style}>
        Loading...
      </div>
    );
  else {
    const { current } = WeatherData;
    const Image =
      current.weather[0].main.search(/clouds/i) !== -1
        ? cloudImage
        : current.weather[0].main.search(/rain/i) !== -1
        ? RainImage
        : current.weather[0].main.search(/sun/i) !== -1
        ? sunImage
        : current.weather[0].main.search(/clear/i) !== -1
        ? clearImage
        : NormalImage;
    return (
      <div
        className={`component ${props.country.name.toUpperCase()}`}
        onClick={props.handleClick}
        style={style}
      >
        {/* console.log(WeatherData) */}
        <b>{props.country.name.toUpperCase()}</b>
        <img src={Image} alt="jsdkl" />
        <h5>Temp: {current.temp}&deg;C</h5>
      </div>
    );
  }
}

export default Country;
