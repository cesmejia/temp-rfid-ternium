import React from 'react'
import { Typography } from '@material-ui/core';

const TemperatureText = ({temp}) => { 
    let status =  (
        <Typography variant="h1" style={{fontWeight: 700, textAlign:"center"}}>
          {temp} °C
        </Typography>
      );
   
    if(!temp) {
      status = (
        <Typography variant="h3" style={{fontWeight: 700, textAlign:"center"}}>
          ...
        </Typography>
      )
    }
    return status; 
};


export default TemperatureText