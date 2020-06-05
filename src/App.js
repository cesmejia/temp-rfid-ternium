import React, { useRef, useEffect, useState } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import TempCard from "./components/TempCard";
import DataTag from "./components/DataTag";
import MuiAlert from '@material-ui/lab/Alert';
import { NEW_EMPLOYEE, newTempDocument} from "./graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import io from "socket.io-client";
import setTempStatus from "./helpers/tempStatus";
const socket = io("http://localhost:8080");
// const sendToPrint = require("./helpers/sendToPrint");
const getEmployee = require("./helpers/getEmployeeByRfid");
const variables = require("./fakeEnv.json");

let dict = {}, dictionary = {};
let once = true, listening = true, lock = true;

dict.companyId = process.env.COMPANY_ID || variables.COMPANY_ID;
dict.companyName = process.env.COMPANY_NAME || variables.COMPANY_NAME; 
dictionary = {...dict};

function App() {
  const myInput = useRef("");
  const [postTemp, setTemp] = useState();
  const [message, setMessage] = useState("Ingrese tarjeta o acerque su frente al sensor por 3 segundos");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({cN:"", fN:""});

  const [addEmployee] = useMutation(NEW_EMPLOYEE,{
    onError: err =>{
      console.log({message:`addEmployee ${err.message}`});
    }, 
    onCompleted: adata => {
      dictionary.employeeId = adata.addEmployee.employeeId;
      setUser({cN:"Cuprum", fN: "Anonimo XYZ"});
      console.log({message:`Employee Added`});
    }
  });
  

  // const [getEmployee, query] = useLazyQuery(SEARCH_EMPLOYEE,{
  const onError =  err => {
      console.log("Inside query Error...")
      console.log({message:`getEmployee ${err.message}`});
      lock && addEmployee({ variables: { rfid: myInput.current.value }});
      dictionary.fullName = "Anonimo X Y";
      dictionary.rfid = myInput.current.value;
    };
  const onCompleted = cdata => {
      console.log({cdata})
      const { _id, companyName, rfid, fullName } = cdata.getEmployeeByRfid;
      setUser({cN:companyName, fN: fullName});
      console.log({message:`Employee Found`});
      console.log("name", fullName)
      setMessage("Acerque su frente al sensor por 3 segundos");
      dictionary.employeeId = _id;
      dictionary.rfid = rfid;
      dictionary.companyName = companyName;
  };


  const [newTemp] = useMutation(newTempDocument,{    
    onError: err => {
      console.log({message:`newTemp ${err.message}`});
      // let {temperature, companyName, rfid} = dictionary;
      // const fullName = "Anonimo X Y"
      // sendToPrint({temperature, fullName, companyName, rfid, date:Date().slice(0,15)});
    },
    onCompleted: tdata => {
      // const {rfid,temperature, companyName} = dictionary;
      // (rfid && companyName) && sendToPrint({ rfid, temperature, companyName,fullName: (query.data.getEmployeeByRfid.fullName || "Anonimo X Y" ), date: Date().slice(0,15) }); //use user instead of query
      console.log("ALLLLLLL DONNNNEEEE");
    }
  });
  
  
  
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
        newTemp({ variables:{ ...dictionary }});
        
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
      // getEmployee({ variables: { rfid: value }, fetchPolicy: 'network-only' });
      getEmployee(value)
        .then( data => onCompleted(data))
        .catch( e => onError(e));

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
    dictionary = {...dict};
    setUser({cN:"", fN:""})
    setTempStatus(false)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  const makeErrAndClean = () => {
    lock = false;
    // getEmployee({ variables: {  } });
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
