const express = require("express");
const path = require("path");

const app = new express();

app.use(express.static("public"));
app.get("/cyo.js", (_req,res)=>{

    res.sendFile(path.join(__dirname, ".." , "cyo.js"));
    
});

console.log("Listening..");
app.listen(1337);