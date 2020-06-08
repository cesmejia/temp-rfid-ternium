const axios = require("axios");
const variables = require("../fakeEnv.json");
const token = process.env.TOKEN || variables.TOKEN;

const instance = axios.create({
    // url: "https://okku.herokuapp.com/",
    url: "http://localhost:4000/",
    headers: {"authorization":`Bearer ${token}`}
});

module.exports = instance;