import React from 'react'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
export const WeatherButton = ({setCity,cities}) => {

 
  
  return (
    <div>
    
      {
        cities.map((item,index)=>(
          <Button variant="light" key={index} onClick={()=>setCity(item)}>{item}</Button>
        ))
      }
    </div>
  )
}
