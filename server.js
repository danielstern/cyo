const express = require("express");

const app = new express();

app.use(express.static("public"));

app.use("cyo.js", (_req,res)=>{
    res.sendFile("index.js");
});

app.listen(1337);