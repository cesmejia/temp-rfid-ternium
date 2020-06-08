import React, { useRef, useEffect, useState } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import TempCard from "./components/TempCard";
import DataTag from "./components/DataTag";
import MuiAlert from '@material-ui/lab/Alert';
import { addEmployee, getEmployee, newTempDocument } from "./graphql/queries/index";
import io from "socket.io-client";
import setTempStatus from "./helpers/tempStatus";
const socket = io("http://localhost:8080");


let dict = {}, dictionary = {};
let once = true, listening = true, lock = true;

function App() {
  const myInput = useRef("");
  const [postTemp, setTemp] = useState();
  const [message, setMessage] = useState("Ingrese tarjeta o acerque su frente al sensor por 3 segundos");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({cN:"", fN:""});

  // const [addEmployee] = useMutation(NEW_EMPLOYEE,{
  const onErrorAE = err => {
      console.log({message:`addEmployee ${err.message}`});
  };
  const onCompletedAE = adata => {
      dictionary.employeeId = adata.addEmployee.employeeId;
      setUser({cN:"Cuprum", fN: "Anonimo XYZ"});
      console.log({message:`Employee Added`});
  };
  

  // const [getEmployee, query] = useLazyQuery(SEARCH_EMPLOYEE,{
  const onErrorGE =  err => {
      console.log("Inside query Error...")
      console.log({message:`getEmployee ${err.message}`});
      lock && addEmployee(myInput.current.value)  
          .then( data => onCompletedAE(data) )
          .catch( err => onErrorAE(err) );

      dictionary.fullName = "Anonimo X Y";
      dictionary.rfid = myInput.current.value;
    };
  const onCompletedGE = cdata => {
      const { _id, companyName, rfid, fullName } = cdata.getEmployeeByRfid;
      setUser({cN:companyName, fN: fullName});
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
          setMessage("Gracias! Registrando...");
          capturing(data.temp);
        }
  
      });
    }, []);

  const enter = (e) => {
    const value = myInput.current.value;
    if (e.key === "Enter" && value !== "" && !myInput.current.disabled) {
      setMessage("Acerque su frente al sensor por 3 segundos");
      lock=true;

      getEmployee(value)
        .then( data => onCompletedGE(data))
        .catch( e => onErrorGE(e));

      dictionary.rfid = value;
      console.log("enter");
      myInput.current.disabled = true; 
      setTempStatus(true);
    }
  };

  const clean = () => {
    console.log("Running clean...")
    myInput.current.disabled = false;
    myInput.current.value = "";
    dictionary = {};
    setUser({cN:"", fN:""})
    setTempStatus(false)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  const makeErrAndClean = () => {
    lock = false;
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
      </Grid>
    </div>
  );
}
export default App;
