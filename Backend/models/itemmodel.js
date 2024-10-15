const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
    productId:String,
    productsName:String,
    productType:String,
    price:String,
  
    quentity:String,
   
},{
    timestamps:true

})

const itemmodel=mongoose.model("Products",itemchema)
module.exports = itemmodel;