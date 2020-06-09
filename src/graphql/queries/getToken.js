import axe from "../axiosCom";

const getTerniumToken = () => {
  return new Promise((resolve, reject) => {
     axe({
        method: 'post',
        data: {
          query: `
          query{
              getTerniumToken{
                token
              }
            }`
          }
      }).then((result) => {
          if( "errors" in result.data){
            reject(result.data.errors[0])
          }else{
            resolve(result.data.data.getTerniumToken.token)
            //console.log(result.data.data) //getTerniumToken.token
          }
      }).catch( e=>{
          reject(e);
      })
  });
};


export default getTerniumToken;
