const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_id:{
        type : Number,
        required : true,
        unique : true
    },
    product_name:{
        type : String,
        required : true
    },
    quantity:{
        type:Number,
        required : true
    },
    unit_price:{
        type : Number,
        required : true
    },
    description:{
        type:String,
        max: 300

    }
})

const Product = mongoose.model('product',productSchema);
module.exports = Product;
