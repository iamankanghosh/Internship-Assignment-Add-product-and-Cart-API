# Add product and cart API
run $ npm start

open post man and use
1) method POST 
 url : http://localhost:4000/addproduct  or (for demo uses) https://cartandproductapi.herokuapp.com/addproduct
 add body : 

  { 
    // demo dataset
    "product_id": 10,
    "product_name":"Abc" ,
    "quantity":5 , 
    "unit_price":100 ,
    "description": "this is a good product"
  }
  then send & receive output
  
2) method GET 
 url : http://localhost:4000/allproducts  or (for demo uses) https://cartandproductapi.herokuapp.com/allproducts
 then send & receive output
 
3) method POST 
 url : http://localhost:4000/addtocart  or (for demo uses) https://cartandproductapi.herokuapp.com/addtocart
 add body : 
  { 
    // demo dataset
    "user_id":123456,
    "product_id":10 ,
    "quantity":2
  }
  then send & receive output
  
 4) method POST 
 url : http://localhost:4000/userCart  or (for demo uses) https://cartandproductapi.herokuapp.com/userCart
 add body : 
  {
    // demo dataset
    "user_id":2
  }
  then send & receive output
  
5) method GET 
 url : http://localhost:4000/allcart  or (for demo uses) https://cartandproductapi.herokuapp.com/allcart
 then send & receive output
 
 
