# My-Products

[![npm](https://img.shields.io/npm/l/express.svg)]()

## Getting started

`$ npm install`

## Download Product Catalogue Postman Collection from the below Url and you can refer the API docs below:

[API Postman Collection](https://www.getpostman.com/collections/82912b70a22b85b673cd)

## Create Products

This is a POST method where we can add product using this request and we get back response with the Product_Id.

```
POST Request: `http://localhost:3000/api/v1/addProduct`
```

#### Request Parameters (In JSON)

```
1. productName - `Your product name`
2. productPrice - `Your product price`
3. description - `Your Product description`
```

#### Response Parameters (In JSON)

```
1. message - `Message for all states`
2. productID - `Product id provided while creation of product`
```

## Update Product

This is also a POST method where we update the products data using this request and in back we get a success message as a response.

```
POST Request: `http://localhost:3000/api/v1/updateProduct`
```

#### Request Parameters (In JSON)

```
1. productName - `Your product name`
2. productPrice - `Your product price`
3. description - `Your Product description`
4. productId -`Unique product Id`
```

#### Response Parameters (In JSON)

```
1. message - `Message for all states`
```

## Get All Products

This is a GET method. We can get all the products list and its data as response back.

```
GET Request:`http://localhost:3000/api/v1/getProducts`
```

#### Response Parameters (In JSON)

```
1. message - `Message for all states`
2. data - `Product details will be available as array of objects`
```

## Get Specific Product

This is a Get Method.We will pass specific key using query params and get that specific product list as response back.

```
GET Request: `http://localhost:3000/api/v1/getProduct?id=productId`
```

#### Request Parameters (In JSON)

```
1. productId -`Unique product Id`
```

#### Response Parameters (In JSON)

```
1. message - `Message for all states`
2. productdata - `respective product data will be available as object `
```

```
### If you face any difficulty or having any suggestion, feel free post your review on repository
```
