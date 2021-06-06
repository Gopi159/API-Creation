const Product = require("./model");
var ObjectId = require("mongodb").ObjectID;
const code = require("../../utils/properties");
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
        message: code.PRODUCT_RETRIVAL_FAILED,
      });
      return;
    }
    res.status(code.SUCCESS_WITH_CREATED_STATUS).json({
      productId: result._id,
      message: code.ADD_PRODUCT_SUCCESS,
    });
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: code.PRODUCT_RETRIVAL_FAILED,
    });
  }
};
exports.update = function (req, res) {
  if (!req.body._id) {
    res.status(code.BAD_REQUEST).json({
      message: code.PRODUCT_ID_REQUIRED,
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
      message: code.UPDATE_PRODUCT_SUCCESS,
    });
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: code.PRODUCT_RETRIVAL_FAILED,
    });
    return;
  }
};

exports.getAll = function (req, res) {
  try {
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
            message: code.PRODUCT_RETRIVAL_FAILED,
          });
          return;
        }
        if (products.length == 0) {
          res.status(code.NOT_FOUND_STATUS_).json({
            message: code.PRODUCT_NOT_FOUND,
          });
          return;
        }
        res.status(code.SUCCESS_STATUS).json({
          data: products,
        });
      }
    );
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: code.PRODUCT_RETRIVAL_FAILED,
    });
  }
};

exports.getById = function (req, res) {
  if (!req.query.id) {
    res.status(code.BAD_REQUEST).json({
      message: code.PRODUCT_ID_REQUIRED,
    });
    return;
  }
  try {
    Product.findOne({ _id: ObjectId(req.query.id) }, function (err, product) {
      if (!product) {
        res.status(code.NOT_FOUND_STATUS_).json({
          message: code.PRODUCT_NOT_FOUND,
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
      message: code.PRODUCT_RETRIVAL_FAILED,
    });
    return;
  }
};
