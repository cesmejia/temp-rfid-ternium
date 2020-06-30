import axe from "../axiosCom";
import variables from "../../fakeEnv.json";
const companyId = process.env.COMPANY_ID || variables.COMPANY_ID;
const companyName = process.env.COMPANY_NAME || variables.COMPANY_NAME;

const addEmployee = (obj) => {
  const {rfid, firstName, dadSurname, momSurname, gender, birthday, outsourcedEmployee, companyEmployeeId} = obj;
  
  let gen = gender;
  switch (gen) {
    case "M":
      gen = "Masculino"
      break;
    case "F":
      gen = "Femenino"
      break;
    case null:
      gen = null
      break;
    default:
      gen = null
  }

  return new Promise((resolve, reject) => {
     axe({
        method: 'post',
        data: {
          query: `
          mutation{
              addEmployee(
                    rfid:"${rfid}",
                    firstName: "${firstName}", 
                    dadSurname: "${dadSurname}", 
                    momSurname: "${momSurname}", 
                    companyName: "${companyName}", 
                    companyId: "${companyId}",
                    gender: "${gen}",
                    birthday: ${birthday},
                    outsourcedEmployee: ${outsourcedEmployee},
                    companyEmployeeId: "${companyEmployeeId}",
              ){
                employeeId
              }
            }`
          }
      }).then((result) => {
          if( "errors" in result.data){
            reject(result.data.errors[0]);
          }else{
            resolve(result.data.data)
          }
      }).catch( e=>{
          reject(e);
      })
  });
}

export default addEmployee;