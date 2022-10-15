const mongoose = require('mongoose'); 

const Product  = new mongoose.Schema({
    name: { type: String, required: true,unique:true},
    desc:{type:String,required:true},
    image:{type:Array,default:""},
    price:{type:Number,required:true},
    inStock:{type:Number,required:true},
    color:{type:Array, require:true},
    size:{type:Array,require:true},
    category:{type:Array},
},{timestamps:true})


module.exports = mongoose.model('Product',Product); 