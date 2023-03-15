import React,{ useEffect } from 'react'
import Countries2 from '../components/Countries2';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../features/countrySlice';

const Countries = () => {
  const { countriesData } = useSelector((state:any)=>state.country);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  },[dispatch]);

  return (
    <div>
      <Countries2 countriesData={countriesData}/>
    </div>
  )
}

export default Countries;