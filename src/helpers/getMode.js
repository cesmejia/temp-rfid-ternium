import {mode} from 'simple-statistics'

const getModes = (array) => {
    console.log("array for mode", array);
    console.log("This is Mode", mode(array));
    // var frequency = {}; // array of frequency.
    // var maxFreq = 0; // holds the max frequency.
    // var modes = [];
    // let prom = 0;
  
    // for (var i in array) {
    //   frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.
  
    //   if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
    //     maxFreq = frequency[array[i]]; // update max.
    //   }
    // }
  
    // for (var k in frequency) {
    //   if (frequency[k] == maxFreq) {
    //     modes.push(k);
    //   }
    // }
    
    // const len = modes.length;
    // modes.forEach((e) => {
    //     prom += parseFloat(e);
    // });
    // let mode = (prom / len);

    // const dec = mode.toString().split(".")[1];
    // if(dec){
    //   let mainNumb = mode.toString().split(".")[0];
    //   let twoDec = "00";
    //   if(dec.length < 2){
    //     twoDec = dec + "0";
    //   }else{
    //     twoDec = dec.slice(0,2);
    //   }
    //   mode = parseFloat([mainNumb, twoDec].join("."));
    // }

    // console.log("mode", mode(array));
    // console.log("custommode", mode([35.6,35.6,34.7,34.7, 35.6]));

    return mode(array);
  }

export default getModes;