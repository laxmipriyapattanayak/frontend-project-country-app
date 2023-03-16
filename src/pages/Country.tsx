import React from 'react'
import { useParams } from 'react-router-dom';

const Country = () => {
  let { name } = useParams();
  return (
    <div>Country : {name}</div>
  )
}

export default Country