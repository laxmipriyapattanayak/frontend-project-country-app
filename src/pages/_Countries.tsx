import React,{ useEffect } from 'react'
import Countries from '../components/Countries';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../features/countrySlice';

const _Countries = () => {
  const dispatch = useDispatch();
  const { countriesData, loading } = useSelector((state:any)=>state.country);

  useEffect(() => {
    if(countriesData.length === 0) {
      dispatch(fetchCountries());
    } 
  },[dispatch, countriesData.length]);

  return (
    <div>
      {loading ? <h3>Loading, Please Wait! </h3> : <Countries countriesData={countriesData}/> }
      
    </div>
  )
}

export default _Countries;