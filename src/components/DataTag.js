import React from 'react';
import { Grid, Paper, TextField, Button } from '@material-ui/core';

 
const DataTag = ({myInput, user, clean, toggleFocus}) => {

  return (
    <Grid item xs={12} sm={12} style={{position: "absolute", bottom: 0, width: "100%"}}>
      <Paper style={{height:"100%", backgroundColor: "white", color:"white", padding:"13px 30px 26px"}}>
        <Grid container  direction="row" justify="center" alignItems="center" > 

          <Grid item xs={3} sm={3} style={{display: "flex", justifyContent: "center"}}>
            <TextField label="Ingresa tu # de Tarjeta " id="standard-size-small" defaultValue="" inputRef={myInput} autoFocus inputProps={{style: {fontSize: "1.50rem"} }}/>
          </Grid>

          <Grid item xs={6} sm={6} style={{marginLeft:"20px",marginRight:"-20px", display:"flex"}} >
            <TextField id="outlined-basic" disabled value={user.fN} style={{margin:5}} label="Nombre" inputProps={{style: {fontSize: "1.50rem"} }} />
            <TextField id="outlined-basic" disabled value="CUPRUM" style={{margin:5}} label="Empresa"  inputProps={{style: {fontSize: "1.50rem"} }}/>
          </Grid>


          <Grid item xs={3} sm={3} style={{display: "flex", justifyContent: "center"}} >
            <Button variant="contained" onClick={()=>clean()} style={{fontSize: "large", fontWeight: "bold"}}>Limpiar tarjeta</Button>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  )
}
 
export default DataTag;