import React,{useEffect, useState} from "react";
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState([])

  const fetchCountries = () => {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => setCountries(res.data))
        .catch((err) => console.log(err))
  }
  
  useEffect(() => {
    fetchCountries()
  },[]);

  return (
    <div> 
      
        <section>
          <table>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Region</th>
                <th>Population</th>
                <th>Languages</th>
              </tr>
            </thead>
            <tbody>
              {countries && countries.map((country)=> {
                return (
                  <tr key={country?.name?.common}>
                    <td>
                      <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                    </td>
                    <td>{country?.name?.common}</td>
                    <td>{country?.region}</td>
                    <td>{country?.population}</td>
                    <td>
                      <ul>
                        { country.languages && Object.values(country?.languages).map((lang)=><li key={lang}>{lang}</li>) }
                      </ul>
                    </td>
                    <td>&#10084;</td>
                    <td></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
        </section>
    </div>
  );
};

export default Countries;