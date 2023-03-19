import React,{ useEffect, useState } from 'react'
import Countries from '../components/Countries';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, countrySearch } from '../features/countrySlice';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const CountriesPage = () => {
  const dispatch = useDispatch();
  const { countriesData, loading } = useSelector((state:any)=>state.country);
  const [searchString, setSearchSting] = useState('');

  useEffect(() => {
      dispatch(fetchCountries()); 
  },[dispatch]);

  const handleSearch = (e: any) => {
    if(searchString) {
      dispatch(countrySearch(searchString))
    } else {
      dispatch(fetchCountries());
    }
  }
  const refresh = () => {
    setSearchSting('');
    dispatch(fetchCountries());
  }

  return (
    <div>
      
      <TextField id="standard-basic" label="Search" value={searchString} variant="standard" onChange={(e) => setSearchSting(e.target.value)} onKeyUp={handleSearch} onBlur={refresh}/>
      {loading ? <p><CircularProgress />Loading... Please Wait</p> : <Countries countriesData={countriesData}/> }
    </div>
  )
}

export default CountriesPage;