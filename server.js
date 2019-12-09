const express = require("express");
const path = require("path");


const app = new express();

app.use(express.static("public"));
app.get("/cyo.js", (_req,res)=>{
    console.log("Accessing...");
    res.sendFile(path.join(__dirname, "index.js"));
});





console.log("Listening..");
app.listen(1337);