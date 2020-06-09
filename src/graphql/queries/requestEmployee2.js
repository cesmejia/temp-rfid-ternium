import axios from "axios";
import qs from "qs";

const two =
  "https://www.novaservicios.com.mx/nova/hcn/SaludOcupacional/Api/SistemaMedio/Trabajador/ConsultaPorCredencial";


const requestEmployee = (idNmb, token) => {
  return new Promise( async(resolve, reject) => {

    axios({
          url: two,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          method: "post",
          data: qs.stringify({
            NumeroTarjeta: idNmb,
          }),
        })
          .then((result) => {
            resolve(result.data.Datos.Empleado[0]);
          })
          .catch( e => { reject(e) });
  })
};  

// requestEmployee("404079")
//   .then(e => {console.log({e})})
//   .catch(e => {console.log(e)})


export default requestEmployee



