import React from 'react'
import { useSelector } from 'react-redux';
import Countries2 from '../components/Countries2';

const Favorite = () => {
  const { favoriteValue } = useSelector((state:any)=>state.favorite);
  const countries = favoriteValue.filter((fv:any) => fv.fav === true).map((fv:any) => fv.country );
  return (
    <>
      {countries.length > 0 ? <Countries2 countriesData={countries}/> : <p>no favorite data</p>}
    </>
  )
}

export default Favorite