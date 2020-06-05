import { gql } from "apollo-boost";

const green = {temp:30,sensorID:1};
    
const gray = {temp:null,sensorID: null};
    
const red = {temp:40,sensorID:1};

const NEW_EMPLOYEE = gql`
    mutation newOne( $rfid: String!){
        addEmployee( 
            rfid: $rfid,
            firstName: "Anonimo", 
            dadSurname: "X", 
            momSurname: "Y", 
            companyName: "Cuprum", 
            companyId: "5ed6a5f40b442d1cf8b9fba6" ){
            employeeId
        }
    }
`;
    
const SEARCH_EMPLOYEE =  gql`
    query( $rfid: String! ){
        getEmployeeByRfid (rfid: $rfid) {
            _id
            fullName
            companyName
            companyEmployeeId
            rfid
        }
    }
`;


// edEmployee: Boolean, sequentialId: Int, diagnosedHtAnswer: Boolean, htTreatmentAnswer: Boolean): EmployeeId

// firstName: 'Anónimo',
// dadSurname: 'X',
// momSurname: 'Y',
// rfid: newEmployeeId,
// companyName: process.env.COMPANY_NAME,
// companyId: process.env.COMPANY_ID




const newTempDocument = gql`
    mutation newTemp( $temperature: Float!, $rfid: String!, $companyName: String!, $companyId: ID!, $employeeId: ID!){
        newTempDocument(input:{ 
            temperature:$temperature,
            companyId:$companyId,
            companyName:$companyName,
            rfid:$rfid,
            employeeId:$employeeId
        }){
            rfid
        }
    }
`;

export {
    green,
    red,
    gray,
    newTempDocument,
    NEW_EMPLOYEE,
    SEARCH_EMPLOYEE,
};