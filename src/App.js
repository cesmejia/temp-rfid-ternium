import React, { useRef, useEffect, useState } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import TempCard from "./components/TempCard";
import DataTag from "./components/DataTag";
import MuiAlert from '@material-ui/lab/Alert';
import { addEmployee, getEmployee, newTempDocument, getToken, requestEmployee } from "./graphql/queries/index";
import io from "socket.io-client";
const socket = io("http://localhost:8080");


let dictionary = {};
let once = true, listening = true;
let token, count = 0;

getToken()
  .then( data => { 
    token = data
    console.log({token})
  } )
  .catch( e => { throw e } )

function App() {
  const myInput = useRef("");
  const [postTemp, setTemp] = useState();
  const [message, setMessage] = useState("Ingrese tarjeta o acerque su frente al sensor por 3 segundos");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user, setUser] = useState("");

  // const [addEmployee] = useMutation(NEW_EMPLOYEE,{
  const onErrorAE = err => {
      console.log({message:`addEmployee ${err.message}`});
  };
  const onCompletedAE = adata => {
      dictionary.employeeId = adata.addEmployee.employeeId;
      console.log({message:`Employee Added`});
  };
  

  // const [getEmployee, query] = useLazyQuery(SEARCH_EMPLOYEE,{
  const onErrorGE =  err => {
      console.log("Inside query Error...")
      console.log({message:`getEmployee ${err.message}`});
      dictionary.rfid = myInput.current.value;
      requestEmployee(myInput.current.value, token)
        .then( data => onCompletedRE(data) )
        .catch( e => onErrorRE(e))
    };
  const onCompletedGE = cdata => {
      const { _id, rfid, fullName } = cdata.getEmployeeByRfid;
      setUser(fullName);
      console.log({message:`Employee Found`});
      console.log("name", fullName)
      setMessage("Acerque su frente al sensor por 3 segundos");
      dictionary.employeeId = _id;
      dictionary.rfid = rfid;
  };


  // const [newTemp] = useMutation(newTempDocument,{    
  const onErrorNT = err => {
      console.log({message:`newTemp ${err.message}`});
    };
  const onCompletedNT =  tdata => {
      console.log("ALLLLLLL DONNNNEEEE");
    }


  // requestEmployee   
  const onErrorRE = err => {
      console.log({message:`requestEmployee ${err.message}`});
      count ++;
      if(count < 5) {
        getToken()
        .then( data => { 
          token = data;
          requestEmployee(myInput.current.value, token)
            .then( data => onCompletedRE(data) )
            .catch( e => onErrorRE(e))
        })
        .catch( e => { throw e } )
      }else{
        setOpen2(true);
        clean();
      }
    };
  const onCompletedRE =  val => {
      const user = {
        momSurname: val.Materno,
        dadSurname: val.Paterno,
        rfid: val.NumeroTarjeta,
        firstName: val.Nombre
      }
      addEmployee(user)  
          .then( data => onCompletedAE(data) )
          .catch( err => onErrorAE(err) );
      dictionary.fullName = val.Nombre;
      setUser(val.Nombre);
      console.log({re:val});
    }
  
  
  const capturing = temp => {
    if(once){
      setTimeout(()=>{
        setMessage("...");
        listening = false;
        (temp === 0) 
            ? setMessage("Temperatura fuera de Rango, favor de volver a tomar la lectura")
            : setTemp({temp, sensorID:1});
        dictionary.temperature = temp;
        console.log({check:dictionary})
        newTempDocument( dictionary )
            .then( data => onCompletedNT(data) )
            .catch( er => onErrorNT(er) );
        
        setTimeout(() => {
          setTemp({temp:null, sensorID:null});
          listening = true;  once = true;
          makeErrAndClean(); // Try to fix error
        }, 4000 ); // how long will the temperature show

      }, 3000); // how long will the mode listen
      once = false
    };
  };
  
    useEffect(() => {
      socket.on("temp", (data) => {
  
        if(listening){
          setTemp({temp:"Reading", sensorID:null});
          console.log("Reading..");
          setOpen(true);
          // setMessage("Gracias! Registrando...");
          capturing(data.temp);
        }
  
      });
    }, []);

    
    socket.on("status", (data) => {

      if(listening){
        // setOpen(true);
        setMessage("Gracias! Registrando...");
        // capturing(data.temp);
      }

    });


  const enter = (e) => {
    const value = myInput.current.value;
    if (e.key === "Enter" && value !== "" && !myInput.current.disabled) {
      setMessage("Acerque su frente al sensor por 3 segundos");

      getEmployee(value)
        .then( data => onCompletedGE(data))
        .catch( e => onErrorGE(e));

      dictionary.rfid = value;
      console.log("enter");
      myInput.current.disabled = true; 
      // setTempStatus(true);
    }
  };

  const clean = () => {
    console.log("Running clean...")
    myInput.current.disabled = false;
    myInput.current.value = "";
    dictionary = {};
    setUser("")
    // setTempStatus(false)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false); setOpen2(false);
  };

  const makeErrAndClean = () => {
    clean();
    setMessage("Ingrese tarjeta o acerque su frente al sensor por 3 segundos");
    myInput.current.focus()
  };

  
  const handleFocus = () => myInput.current.focus();
  return (
    <div className="App" onMouseMove={handleFocus} onKeyUp={enter} onClick={handleFocus} >
      <Grid container  direction="row" style={{ height:"100vh", position: "fixed" }} >
        <TempCard data={postTemp} message={message} />
        <DataTag myInput={myInput} user={user} clean={makeErrAndClean}/>
        
        <Snackbar open={open} autoHideDuration={2700} onClose={handleClose}  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="info">
                Registrando...
            </MuiAlert>
        </Snackbar>

        <Snackbar open={open2} autoHideDuration={2700} onClose={handleClose}  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                RFID no valida
            </MuiAlert>
        </Snackbar>

      </Grid>
    </div>
  );
}
export default App;
