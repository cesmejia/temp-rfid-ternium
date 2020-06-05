const fetch = require("node-fetch");

const sendToPrint = (values) => {
    if(values.temperature){
        fetch("http://localhost:8080/print", {
            method: "post",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...values}),
         })
         .then((res) => {
             res.json();
            //  console.log(res);
         })
    }
}

module.exports = sendToPrint;