import axe from "../axiosCom";

const getEmployeeByRfid = (rfid) => {

  return new Promise((resolve, reject) => {
     axe({
        method: 'post',
        data: {
          query: `
          query{
              getEmployeeByRfid(rfid:"${rfid}"){
                _id
                fullName
                companyName
                companyEmployeeId
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
      })
  });
}

export default getEmployeeByRfid;