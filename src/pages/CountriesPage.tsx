import React,{ useEffect, useState } from 'react'
import Countries from '../components/Countries';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, fetchCountriesByName } from '../features/countrySlice';
import TextField from '@mui/material/TextField';
const CountriesPage = () => {
  const dispatch = useDispatch();
  const { countriesData, loading } = useSelector((state:any)=>state.country);
  const [searchString, setSearchSting] = useState('');

  useEffect(() => {
      dispatch(fetchCountries()); 
  },[dispatch]);

  const handleSearch = (e: any) => {
    if(searchString) {
      dispatch(fetchCountriesByName(searchString))
    } else {
      dispatch(fetchCountries());
    }
  }

  return (
    <div>
      <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => setSearchSting(e.target.value)} onKeyUp={handleSearch}/>
      {loading ? <p>Loading... Please Wait</p> : <Countries countriesData={countriesData}/> }
    </div>
  )
}

export default CountriesPage;