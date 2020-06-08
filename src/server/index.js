const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const PORT = 8080;

app.use( bodyParser.json() );

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
});

app.get('/*', (req, res) => {
    res.json({
        title:"Welcome to the temperature endpoint", 
    message:"The POST request should have the following format",
    example:{
        temp:45,
        sensorID:1
    }
    })
});

app.post('/temp', (req, res) => {
    if(req.body.temp){
        const {temp} = req.body;

        if ( typeof(temp) !== "number" ){
            res.status(200).json({ message: "temp values must be number type" })
        }else{
            res.status(200).json({ message: "success" }); io.sockets.emit("temp", req.body);
        }
    }
    else{
        if ( req.body.temp === 0 ){
            res.status(200).json({ message: "success" }); io.sockets.emit("temp", req.body);
        }else {
            res.status(200).json({message: "something wrong in key names"})
        }
    }
});

app.post('/temp/status', (req, res) => {
    console.log(req.body)
    if( req.body.start === true ){

        if(req.body){
            io.sockets.emit("status", req.body )
            res.status(200).json({message: "true"})
        }else{
            res.status(200).json({message: "false"})
        }
    } else{
        res.status(200).json({message: "something went wrong"})
    }
});

app.post('/print', (req, res) => {
    if(req.body){
        console.log({printer:{...req.body}})
        res.status(200).json({message: "success"})
    }else{
        res.status(200).json({message: "something went bad"})
    }
});

http.listen(PORT, ()=>{
    console.log(`Server ready on port ${PORT}`)
});