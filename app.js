const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const port = process.env.PORT;

require("./db/connection");
const Product = require('./model/productSchema');
const Cart = require('./model/cartSchema');

const checkInputs = (req, res, next) => {
    const { product_id, product_name, quantity, unit_price, description } = req.body;
    if (description.length > 300 || !product_id || !product_name || !quantity || !unit_price || !description) {
        res.json({ "error": "add product details correctly" });
    }else{
        next();
    }
    
}

app.post('/addproduct',checkInputs, async (req, res) => {
    try {
        const { product_id, product_name, quantity, unit_price, description } = req.body;
        const productExists = await Product.findOne({ product_id: product_id });
        
        if (productExists) {
            productExists.product_name = product_name;
            productExists.quantity = productExists.quantity + quantity;
            productExists.unit_price = unit_price;
            productExists.description = description;
            await productExists.save();
            res.json({ "message": "product added successfully" });
        }
        else {
            const newproduct = new Product({ product_id, product_name, quantity, unit_price, description });
            await newproduct.save();
            res.json({ "message": "product added successfully" });
        }

    } catch (error) {
        res.send(error);
    }
})

app.get('/allproducts', async (req, res) => {
    res.send(await Product.find());
})


app.post('/addtocart', async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        if (quantity > 3) {
            res.json({ "message": "more than 3 quantity of this product is not available" });
        } else {
            const userCartExists = await Cart.findOne({ user_id: user_id, product_id: product_id });
            if (userCartExists) {
                if (userCartExists.quantity < 3) {
                    userCartExists.quantity = userCartExists.quantity + quantity;
                    if (userCartExists.quantity<=3) {
                        await userCartExists.save();
                        res.json({ "message": "product added to cart" });
                    } else {
                        res.json({ "message": "maximum limit of this product is already taken" });
                    }
                    
                } else {
                    res.json({ "message": "maximum limit of this product is already taken" });
                }
            }
            else {
                const productDetails = await Product.findOne({ product_id: product_id });
                let product_name = productDetails.product_name;
                const newcart = new Cart({ user_id, product_id, product_name, quantity });
                await newcart.save();
                res.json({ "message": "product added to cart" });
            }
        }

    } catch (error) {
        res.send(error);
    }
})

app.post('/userCart', async (req, res) => {
    const userCartData = await Cart.findOne({user_id : req.body.user_id});
    if (userCartData) {
        const userAllCartData = await Cart.find({user_id : req.body.user_id});
        res.json (userAllCartData);
    } else {
        res.json({ "message": "no data of this user" });
    }  
})
app.get('/allcart', async (req, res) => {
    res.json(await Cart.find());
})

app.listen(port, () => {
    console.log(`listening port at ${port}`);
})