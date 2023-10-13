import React, { useState, useEffect } from "react";

export function Register() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // Initialize as an empty array
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // Declare selectedCity and setSelectedCity

  useEffect(() => {
    loadCountries();
  }, []);

  const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  function loadCountries() {
    let apiEndPoint = config.cUrl;

    fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error loading countries:", error));
  }

  function loadStates(countryCode) {
    setSelectedState("");
    setCities([]); // Reset cities

    fetch(`${config.cUrl}/${countryCode}/states`, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => console.error("Error loading states:", error));
  }

  function loadCities(countryCode, stateCode) {
    fetch(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error("Error loading cities:", error));
  }

  return (
    <div>
      <label>Country:</label>
      <select
        value={selectedCountry}
        onChange={(e) => {
          const countryCode = e.target.value;
          setSelectedCountry(countryCode);
          setSelectedState(""); // Reset selected state
          setCities([]); // Reset cities
          loadStates(countryCode); // Load states for the selected country
        }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>

      <label>State:</label>
      <select
        value={selectedState}
        onChange={(e) => {
          const stateCode = e.target.value;
          setSelectedState(stateCode);
          loadCities(selectedCountry, stateCode); // Load cities for the selected country and state
        }}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.iso2} value={state.iso2}>
            {state.name}
          </option>
        ))}
      </select>

      <label>City:</label>
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.iso2} value={city.iso2}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
