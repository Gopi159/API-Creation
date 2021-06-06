const Product = require("./model");
var ObjectId = require("mongodb").ObjectID;

exports.post = function (req, res) {
  const { name, price, description } = req.body;
  const product = new Product({
    name,
    price,
    description,
  });
  product
    .save()
    .then((data) => {
      try {
        res.status(201).json({
          data: data._id,
        });
      } catch (err) {
        throw err;
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
exports.update = function (req, res) {
  if (!req.body._id) {
    res.status(400).json({
      message: "Product Id is Required",
    });
    return;
  }
  const { _id, name, description, price } = req.body;
  Product.update(
    { _id: _id },
    { $set: { name: name, description: description, price: price } },
    function (err, product) {
      if (err) {
        res.status(500).json({
          message: "We are Unable to update Product. Please try after sometime",
        });
        return;
      }
      res.status(200).json({
        message: "Product Updated Successfully",
      });
    }
  );
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
        res.status(500).json({
          message: "We are Unable to get Products. Please try after sometime",
        });
      }
      try {
        if (products.length == 0) {
          res.status(404).json({
            message: "No Products Found",
          });
          return;
        }
        res.status(200).json({
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
    res.status(400).json({
      message: "Product Id is Required",
    });
    return;
  }
  Product.findOne({ _id: ObjectId(req.query.id) }, function (err, product) {
    if (err) {
      res.status(500).json({
        message: "We are Unable to get Product. Please try after sometime",
      });
      return;
    }
    if (!product) {
      res.status(404).json({
        message: "No Product Found",
      });
      return;
    }

    res.status(200).json({
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productDescription: product.description,
      addedOn: product.createdAt,
      status: product.status ? "Active" : "Not Active",
    });
  });
};
