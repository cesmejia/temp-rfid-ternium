const axios = require("axios");

const one = "https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt"
const two = "https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt"

const requestOne = axios.post(one);
const requestTwo = axios.post(two);

axios.all([requestOne, requestTwo]).then(
  axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    const responesThree = responses[2]
    
})).catch(errors => {
    throw errors
})



const getTerniumToken = (id) => {

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
            resolve(result.data.data)
          }
      }).catch( e=>{
          reject(e);
      })
  });
}

module.exports = getTerniumToken;