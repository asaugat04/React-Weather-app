import DataList from "./Dependencies/countryList";
import Country from "./components/country";
import React from "react";
import WeatherDataSection from "./components/WeatherDataSection";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      focusedItem: [],
    };
  }

  handleClick(event) {
    // handleDetails();
    let selectedCountry;
    const component = [...document.getElementsByClassName("component")];
    component.map((item) => item.classList.remove("focused"));

    if (!event.target.classList.contains("component")) {
      event.target.parentElement.classList.add("focused");
      selectedCountry = event.target.parentElement.classList[1];
    } else {
      event.target.classList.add("focused");
      selectedCountry = event.target.classList[1];
    }

    DataList.map((item) => {
      if (item.name.toUpperCase() === selectedCountry.toUpperCase())
        this.setState({ focusedItem: [item.lat, item.lon] });
      return null;
    });
  }

  render() {
    const countryElement = DataList.map((country) => {
      return (
        <Country
          key={country.id}
          country={country}
          handleClick={this.handleClick}
        />
      );
    });

    return (
      <div>
        <div
          className="CountryList"
          style={{ display: "flex", flexDirection: "row", overflowY: "scroll" }}
        >
          {countryElement}
        </div>
        {this.state.focusedItem.length === 0 ? (
          ""
        ) : (
          <WeatherDataSection countryData={this.state.focusedItem} />
        )}
      </div>
    );
  }
}
export default App;
