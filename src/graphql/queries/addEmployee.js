import axe from "../axiosCom";
import variables from "../../fakeEnv.json";
const companyId = process.env.COMPANY_ID || variables.COMPANY_ID;
const companyName = process.env.COMPANY_NAME || variables.COMPANY_NAME;

const addEmployee = (obj) => {
  const {rfid, firstName, dadSurname, momSurname} = obj;

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
                    companyId: "${companyId}" 
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