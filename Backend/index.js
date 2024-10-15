const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const itemRoutes = require("./routes/itemroutes");


const app=express()

app.use(cors())
app.use(express.json())

app.use("/", itemRoutes);


const PORT=process.env.PORT||8020







mongoose.connect("mongodb+srv://rivindi:rivindi123@cluster0.jljoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

