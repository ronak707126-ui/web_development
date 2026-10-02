const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{type:String,required: true},

    price:{type:Number,require:true},

    category:{type:String,required:true},

    description:{type:String,require:true},

    image:{type:String,require:true},

    rating:{type:Number,default:0},

    },

    {

        timestamps:true

    }

);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;