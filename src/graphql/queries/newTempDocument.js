const axe = require("../axiosCom");
const variables = require("../../fakeEnv.json");
const companyId = process.env.COMPANY_ID || variables.COMPANY_ID;
const companyName = process.env.COMPANY_NAME || variables.COMPANY_NAME;

const newTempDocument  = (obj) => {
    const {temperature, rfid, employeeId} = obj;

    return new Promise((resolve, reject) => {
        axe({
        method: 'post',
        data: {
            query: `
            mutation{
                newTempDocument(input:{ 
                    temperature: ${temperature},
                    companyId: "${companyId}",
                    companyName: "${companyName}",
                    rfid: "${rfid}",
                    employeeId: "${employeeId}"
                }){
                    rfid
                }
            }`
            }
        }).then((result) => {
            if( "errors" in result.data){
                reject(result.data.errors[0])
            }else{
                resolve(result.data.data)
            }
        }).catch( e=>{
            reject(e);
            console.log(`
            mutation{
                newTempDocument(input:{ 
                    temperature: ${temperature},
                    companyId: "${companyId}",
                    companyName: "${companyName}",
                    rfid: "${rfid}",
                    employeeId: ${employeeId}
                }){
                    rfid
                }
            }`)

        })
    });
}

module.exports = newTempDocument;