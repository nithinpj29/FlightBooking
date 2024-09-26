const dontenv=require("dotenv").config()

const MONGO_USERNAME=process.env.MONGO_USERNAME||'';
const MONGO_PASS=process.env.MONGO_PASS||'';
//const MONGO_URL:string=`mongodb://${MONGO_USERNAME}:${MONGO_PASS}@localhost:27017/libraryhub`;
const MONGO_URL= "mongodb://localhost:27017/flight";

//const PORT=process.env.SERVER_PORT?Number(process.env.SERVER_PORT):8080;

module.exports ={config:{
    mongo:{
        url:MONGO_URL
    },
    server:{
        port:8080
    }
}}