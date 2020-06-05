const allTrue = (arr) => {
  return arr.reduce((x, y) => x && y);
};

const verifyTempDocument = (dict) => {
  const keys = ["companyId", "companyName", "rfid", "employeeId"];
  const check = keys.map((key) => key in dict);
  const verify = allTrue(check);

  if (verify) {
    const values = Object.values(dict);
    const check4EmptyValues = values.map( (d) => d !== "" && d !== null && d !== undefined );
    if (allTrue(check4EmptyValues)) {
      return true;
    } else {
      console.log("No field should be empty");
      return false;
    }
  } else {
    console.log("There's a missing Key");
    return false;
  }
};

module.exports = verifyTempDocument;
