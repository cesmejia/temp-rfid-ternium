const fetch = require("node-fetch");

const setTempStatus = (value) => {
    if( typeof(value) === "boolean" ){
        fetch("http://localhost:8080/temp/status", {
            method: "post",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"start": value}),
         })
         .then((res) => {
             res.json();
            //  console.log(res);
         })
    } else{
        throw new Error("Input must be boolean type")
    }
}

export default setTempStatus;