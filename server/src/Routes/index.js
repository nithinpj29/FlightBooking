const express=require("express")
const app=express();

const FlightRoute=require("./flight")
const userAuthRoute=require("./userAuthRoute")

app.use("/",FlightRoute)
app.use("/user",userAuthRoute)
    

module.exports=app;