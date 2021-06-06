const Product = require("./model");
var ObjectId = require("mongodb").ObjectID;
const code = require("./http-codes");
exports.post = async function (req, res) {
  try {
    const { name, price, description } = req.body;
    const product = new Product({
      name,
      price,
      description,
    });
    const result = await product.save();
    if (!result || !result._id) {
      res.status(code.SERVER_ERROR).json({
        message: "We are Unable to update Product. Please try after sometime",
      });
      return;
    }
    res.status(code.SUCCESS_WITH_CREATED_STATUS).json({
      productId: result._id,
      message: "Product added successfully",
    });
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: "We are Unable to update Product. Please try after sometime",
    });
  }
};
exports.update = function (req, res) {
  if (!req.body._id) {
    res.status(code.BAD_REQUEST).json({
      message: "Product Id is Required",
    });
    return;
  }
  try {
    const { _id, name, description, price } = req.body;
    Product.updateOne(
      { _id: _id },
      { $set: { name: name, description: description, price: price } }
    );
    res.status(code.SUCCESS_WITH_CREATED_STATUS).json({
      message: "Product Updated Successfully",
    });
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: "We are Unable to update Product. Please try after sometime",
    });
    return;
  }
};

exports.getAll = function (req, res) {
  Product.aggregate(
    [
      {
        $project: {
          productName: "$name",
          productPrice: "$price",
          productDescription: "$description",
          productId: "$_id",
          addedOn: "$createdAt",
          productStatus: {
            $cond: {
              if: { $eq: ["$status", true] },
              then: "Active",
              else: "Not Active",
            },
          },
        },
      },
    ],
    function (err, products) {
      if (err) {
        res.status(code.SERVER_ERROR).json({
          message: "We are Unable to get Products. Please try after sometime",
        });
      }
      try {
        if (products.length == 0) {
          res.status(code.NOT_FOUND_STATUS_).json({
            message: "No Products Found",
          });
          return;
        }
        res.status(code.SUCCESS_STATUS).json({
          data: products,
        });
      } catch (err) {
        throw err;
      }
    }
  );
};

exports.getById = function (req, res) {
  if (!req.query.id) {
    res.status(code.BAD_REQUEST).json({
      message: "Product Id is Required",
    });
    return;
  }
  try {
    Product.findOne({ _id: ObjectId(req.query.id) }, function (err, product) {
      if (!product) {
        res.status(code.NOT_FOUND_STATUS_).json({
          message: "No product Found",
        });
      }
      res.status(code.SUCCESS_STATUS).json({
        productId: product._id,
        productName: product.name,
        productPrice: product.price,
        productDescription: product.description,
        addedOn: product.createdAt,
        status: product.status ? "Active" : "Not Active",
      });
    });
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: "We are Unable to get Product. Please try after sometime",
    });
    return;
  }
};
