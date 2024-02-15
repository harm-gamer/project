const mongoose = require("mongoose");
const initdata = require("./data.js");
main().then((res) => {console.log("connected to db")});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const listing = require("../models/listing.js");


let initdb = async () =>{
    await listing.deleteMany({});
     initdata.data = initdata.data.map((obj)=>({...obj, owner : '65aae00b72387a381165f2e1'}));
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initdb();