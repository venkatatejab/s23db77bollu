const mongoose = require("mongoose")
const goatSchema = mongoose.Schema({
goat_color: String,
goat_breed: {type:String,length:15},
goat_price: {type:Number,min:1000,max:100000}
})
module.exports = mongoose.model("goat",goatSchema)