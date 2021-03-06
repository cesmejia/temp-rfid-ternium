const axios = require("axios");
const variables = require("../fakeEnv.json");
const token = process.env.TOKEN || variables.TOKEN;

const instance = axios.create({
    // url: "https://okku.herokuapp.com/",
    url: "https://okku.herokuapp.com/",
    headers: {"authorization":`Bearer ${token}`}
});

export default instance;