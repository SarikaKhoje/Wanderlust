const mongoose=require("mongoose")
const Listing=require("../models/listing.js")
const data=require("./data.js")

main()
.then((res)=>{
    console.log("Connection Succesful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB=async()=>{
    await Listing.deleteMany({})
    await Listing.insertMany(data.data)
    console.log("Data was initialized")

}
initDB();
