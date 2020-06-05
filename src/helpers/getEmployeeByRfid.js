const axios = require("axios");

const getEmployeeByRfid = (rfid) => {

  return new Promise((resolve, reject) => {
     axios({
          url: "https://okku.herokuapp.com/",
        method: 'post',
        headers: {"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImN1cHJ1bUVxdWlwbyIsImVtYWlsIjoiY2VzbWVqaWFAZ3J1cG9zZWFyYS5jb20iLCJjb21wYW55SWQiOiI1ZWQ2YTVmNDBiNDQyZDFjZjhiOWZiYTYiLCJfaWQiOiI1ZWQ2YTljOThiNzM3ZTQwYjQ0NjkxMzIiLCJpYXQiOjE1OTExMzczNjAsImV4cCI6MTY4NTgxMDE2MH0.nFr2TMvzM4RjMoYLkJqLS3Fed1tc0qzzccjFwhxG3ik"},
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
            console.log("AHJHJHHHHHHH")
            reject(result.data.errors[0])
          }else{
            resolve(result.data.data)
          }
      }).catch( e=>{
          reject(e);
      })
  });
}

getEmployeeByRfid("404079");



 // const [getEmployee, query] = useLazyQuery(SEARCH_EMPLOYEE,{
  //   onError: err => {
  //     console.log("Inside query Error...")
  //     console.log({message:`getEmployee ${err.message}`});
  //     lock && addEmployee({ variables: { rfid: myInput.current.value }});
  //     dictionary.fullName = "Anonimo X Y";
  //     dictionary.rfid = myInput.current.value;
  //   },
  //   onCompleted: cdata => {
  //     console.log("cdata", cdata)
  //     const { _id, companyName, rfid, fullName } = cdata.getEmployeeByRfid;
  //     setUser({cN:companyName, fN: fullName});
  //     console.log({message:`Employee Found`});
  //     console.log("name", fullName)
  //     setMessage("Acerque su frente al sensor por 3 segundos");
  //     dictionary.employeeId = _id;
  //     dictionary.rfid = rfid;
  //     dictionary.companyName = companyName;
  //   }
  // });


  module.exports = getEmployeeByRfid;