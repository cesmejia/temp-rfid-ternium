import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import Text from "./TemperatureText";

const TempCard = ({data, message}) => {
 
let status = <h1 style={{textAlign:"center", fontSize:"4vw", margin:0}}>{message}</h1>;
    let bkc = "#000000"; //background-color
    
    const key = typeof(data) !== "undefined";
    if( key ){
      const {temp} = data;
      if( temp && temp<=37.5) {
          bkc = '#41c847';
          status = <Text temp={temp} />;
      }
      else if( temp && temp>=37.5){
          bkc = '#e41414';
          status = <Text temp={temp} />;
      }
      // else if( key ){
      //     bkc = "#000000";
      //     status = <Text />;
      // }
    }

    return (
      <>
        <div style={{position: "absolute", right: 14,	padding: "6vh 6vw", fontWeight:"bolder", fontSize:28, opacity:0.35, color:"white" }}>TERNIUM</div>
        <Grid item xs={12} style={{textAlign:"start", padding:6, height:"80vh"}}>
          <Paper style={{ height:"100%", backgroundColor: bkc, color:"white", justifyContent: "center", display: "flex", alignItems: "center", padding:25 }}>
            {status}
          </Paper>
        </Grid>
      </>
    )
}
 
export default TempCard;