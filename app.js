const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path =require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))



app.listen(8080,()=>{
      console.log("Server is listening to port 8080");
})
main()
.then((res)=>{
    console.log("Connection Successful");
})
.catch((err)=>{
     console.log(err)
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

//test route
// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"California, Goa",
//         country:"India"
//     })
//     await sampleListing.save()
//     console.log("sample was saved");
//     res.send("Successful testing");
// })

//index route
app.get("/",(req,res)=>{
    res.send("Welcome to Wanderlust")
})
app.get("/index/listing",async(req,res)=>{
    const lists=await Listing.find({});
    res.render("listings/index",{Lists:lists})
})
//route show
app.get("/index/:id/show",async(req,res)=>{
    let list=await Listing.findById(req.params.id)
    res.render("listings/show",{list:list})
})
//route edit
app.get("/index/:id/edit",async(req,res)=>{
    let list=await Listing.findById(req.params.id)
    res.render("listings/edit",{list:list})
})
app.patch("/index/:id/update",async(req,res)=>{
    let data=req.body;
    await Listing.findByIdAndUpdate(req.params.id,{title:data.title,
        description:data.desc,price:data.price,location:data.location})
        res.redirect("/index/listing");
    })

app.delete("/index/:id/delete",async(req,res)=>{
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/index/listing")
})

app.get("/index/create",(req,res)=>{
    res.render("listings/new")
})

app.post("/index/create/new",async (req,res)=>{
   
    await Listing.create(req.body);
    res.redirect("/index/listing");
    })
