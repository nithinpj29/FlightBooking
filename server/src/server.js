const express=require("express")
const cors=require("cors")
const{ config } =require( "./config");
const mongoose =require("mongoose");
const Router=require("./Routes")
require('dotenv').config();
const PORT =config.server.port

const app=express();

app.use(express.json());
app.use(cors());
app.use("/api",Router)
app.use((error, req, res, next) => {
    res.status(500).send({ error: error.message });
  });
(async function startup(){
    try{
        await mongoose.connect(config.mongo.url,{w:"majority",retryWrites:true,authMechanism:"DEFAULT"});
        console.log("connection to the mongodb successfully");
        app.get("/health",(req,res)=>{
            res.status(200).json({message:"server running successfully"});
        })
        app.listen(PORT,()=>{
            console.log(`server running on ${PORT} `);
        })
    }catch(error){
        console.log("something not good for connecttion to database",error )
    }
}
)()