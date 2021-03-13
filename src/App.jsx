import { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

import styles from "./App.module.css";
import coronaImage from "./images/image.png";

const App = () => {
  const [state, setState] = useState({
    data: {},
    country: "",
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchData();
      setState((prevState) => ({...prevState, data: response }));
    };
    fetchAPI();
  }, []);

  const handleCountryChange = async (country) => {
    const response = await fetchData(country);
    setState({ data: response, country: country });
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="COVID-19" />
      <Cards data={state.data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={state.data} country={state.country} />
    </div>
  );
};

export default App;
