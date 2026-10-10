const mongoose=require("mongoose")
main()
.then((res)=>{
    console.log("Connection successful");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
         type:String
    },
    image:{
         filename:String,
         url:String,
    //      default:
    //         "https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-quVdX0q5tKQ",
    //      set:(v)=>
    //         v===""
    //      ? "https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-quVdX0q5tKQ":v
    },
    price:{
         type:Number
    },
    location:{
         type:String
    },
    country:{
         type:String
    }
})
const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;