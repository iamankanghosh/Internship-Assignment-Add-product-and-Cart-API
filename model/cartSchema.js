const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user_id:{
        type : Number,
        required : true
    },
    product_id:{
        type : Number,
        required : true,
    },
    product_name:{
        type : String,
        required : true
    },
    quantity:{
        type:Number,
        required : true
    }
})


const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;

