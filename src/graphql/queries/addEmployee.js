const axe = require("../axiosCom");
const variables = require("../../fakeEnv.json");
const companyId = process.env.COMPANY_ID || variables.COMPANY_ID;
const companyName = process.env.COMPANY_NAME || variables.COMPANY_NAME;

const addEmployee = (rfid) => {

  return new Promise((resolve, reject) => {
     axe({
        method: 'post',
        data: {
          query: `
          mutation{
              addEmployee(
                    rfid:"${rfid}",
                    firstName: "Anonimo", 
                    dadSurname: "X", 
                    momSurname: "Y", 
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
          console.log(`
            mutation{
                addEmployee(
                      rfid:"${rfid}",
                      firstName: "Anonimo", 
                      dadSurname: "X", 
                      momSurname: "Y", 
                      companyName: "${companyName}", 
                      companyId: "${companyId}" 
                ){
                  employeeId
                }
              }`)
      })
  });
}

module.exports = addEmployee;