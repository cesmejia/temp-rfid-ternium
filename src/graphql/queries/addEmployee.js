import axe from "../axiosCom";
import variables from "../../fakeEnv.json";
const companyId = process.env.COMPANY_ID || variables.COMPANY_ID;
const companyName = process.env.COMPANY_NAME || variables.COMPANY_NAME;

const addEmployee = (obj) => {
  const {rfid, firstName, dadSurname, momSurname, gender, birthday, outsourcedEmployee, companyEmployeeId} = obj;

  const qwery = () => {
    const Oto = `mutation{
        addEmployee(
          firstName: "${firstName}",    
          dadSurname: "${dadSurname}",
          momSurname: "${momSurname}",      
          companyName: "${companyName}", 
          companyId: "${companyId}",       
          rfid:"${rfid}",
          outsourcedEmployee: ${outsourcedEmployee},
          companyEmployeeId: "${companyEmployeeId}",
          gender:`

    const rri = (gender === null) ? null :`"${gender}"` || null;    

    const no = `, birthday:`;

    const larin = (birthday === null) ? null : `"${birthday}"` ;

    const gologo = `){
              employeeId
            }
          }`;

    return Oto + rri + no + larin + gologo
  }

console.log(qwery())

  return new Promise((resolve, reject) => {
     axe({
        method: 'post',
        data: { query: qwery() }
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