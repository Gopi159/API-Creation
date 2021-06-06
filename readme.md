Project Name : my-products

Description: This collection contains a list of API for performing operations like adding a product,updating a product and get those product which we are added using Postman Tool

Table of Contents: Create Products,Update Product,Get All Products,Get Specific Product

Installation: NodeJS,ExpressJS,Mongoose,dotenv,nodemon

Create Products:

This is a POST method where we can add product using this request and we get back response with the Product_Id.

POST Request: http://localhost:3000/api/v1/addProduct

Update Product:

This is also a POST method where we update the products data using this request and in back we get a success message as a response.

POST Request: http://localhost:3000/api/v1/updateProduct

Get All Products:

This is a GET method. We can get all the products list and its data as response back.

GET Request: http://localhost:3000/api/v1/getProducts

Get Specific Product:

This is a Get Method.We will pass specific key using query params and get that specific product list as response back.

GET Request: http://localhost:3000/api/v1/getProduct?id=60bba676a1cfe150b47168ab
