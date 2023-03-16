import React from 'react'
import { useSelector } from 'react-redux';
import Countries from '../components/Countries';

const Favorite = () => {
  const { countriesData } = useSelector((state:any)=>state.country);
  const countries = countriesData.filter((country:any) => country.isFav);
  return (
    <>
      {countries.length > 0 ? <Countries countriesData={countries}/> : <p>No favorite data</p>}
    </>
  )
}

export default Favorite