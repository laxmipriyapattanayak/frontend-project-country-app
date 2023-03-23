import React from 'react'
import { useSelector } from 'react-redux';
import Countries from '../components/Countries';
import {} from '../types/Types';

const Favorite = () => {
  const { favoriteCountry } = useSelector((state: any)=>state.country);
  return (
    <>
      {favoriteCountry?.length > 0 ? <Countries countriesData={favoriteCountry}/> : <p>No favorite data</p>}
    </>
  )
}

export default Favorite