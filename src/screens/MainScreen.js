import React from "react";
import API from "../API";
import { useState, useEffect } from "react";
import { countryList } from "./countryList";

function MainScreen() {
  const [country, selectCountry] = useState("Afghanistan");
  const [countryStatistics, setStatistics] = useState({});
  const [totalStats, setTotalStats] = useState({});
  const [countriesFromAPI, setCountriesFromAPI] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getTotalFigures();
    }, 901);
  }, []);

  const handleCountrySelect = (e) => {
    selectCountry(e.target.value);
  };

  const getListOfAllCountries = () => {
    return (
      <select onChange={handleCountrySelect}>
        {countryList.map((country, index) => {
          return <option key={`${country}-${index}`}>{country}</option>;
        })}
      </select>
    );
  };
  async function getTotalFigures() {
    const { data } = await API.get("/totals");
    setTotalStats(...data);
  }

  //   async function getCountriesFromAPI(){
  //     const { data } = await API.get("/help/countries");
  //     setCountriesFromAPI(...data)
  //   }

  async function handleOnSubmit(e) {
    e.preventDefault();
    //console.log("submit called")
    //console.log(country)
    const { status,data } = await API.get("/country", { params: { name: country } });
    if(status===200){
        return setStatistics(...data);
    }
}
  function numberWithCommas(largeNumber) {
    if (largeNumber) {
      return largeNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="container">
        <div className="subContainer_1">
          <h1>INFORMATION AT A GLANCE</h1>
          <div>Updated Time: {totalStats.lastUpdate}</div>
          <div>Total Confirmed: {numberWithCommas(totalStats.confirmed)}</div>
          <div>Total Recovered: {numberWithCommas(totalStats.recovered)}</div>
          <div>Total Critical: {numberWithCommas(totalStats.recovered)}</div>
          <div>Total Deaths: {numberWithCommas(totalStats.recovered)}</div>
        </div>

        <div className="subContainer_2">
          <form onSubmit={handleOnSubmit}>
            <h1>SELECT COUNTRY</h1>
            {getListOfAllCountries(countryList)}
            <input type="submit" value="Generate Report" />
          </form>
          <div>Updated Time: {numberWithCommas(countryStatistics.lastUpdate)}</div>
          <div>Country: {numberWithCommas(countryStatistics.country)}</div>
          <div>Confirmed: {numberWithCommas(countryStatistics.confirmed)}</div>
          <div>Recovered: {numberWithCommas(countryStatistics.recovered)}</div>
          <div>Critical: {numberWithCommas(countryStatistics.critical)} </div>
          <div>Deaths: {numberWithCommas(countryStatistics.deaths)} </div>
        </div>
      </div>
    </>
  );
}

export default MainScreen;
